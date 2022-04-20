import * as fs from "fs";

import {json2xml} from "../../xml-js";

import {Env, NpmRunConfig, NpmRunConfigurationOptions, RunConfigBase, RunConfigurationOptions} from "./types";

const findUpGlob = require('find-up-glob');

const RunConfigBaseTemplate: RunConfigBase = {
    component: {
        _attributes: {name: 'ProjectRunConfigurationManager'},
        configuration: {
            _attributes: {
                name: '',
                type: "NodeJSConfigurationType",
            },
            envs: [
                {
                    env: {
                        _attributes: {
                            name: 'hello',
                            value: 'world'
                        }
                    }
                }
            ],
        }
    }
}

const NpmRunConfigBaseTemplate: NpmRunConfig = {
    component: {
        _attributes: {name: "ProjectRunConfigurationManager"},
        configuration: {
            _attributes: {
                name: '',
                type: 'js.build_tools.npm',
            },
            "package-json": {
                _attributes: {
                    value: ""
                }
            },

            command: {_attributes: {value: "run"}},
            scripts: [
                {
                    script: {
                        _attributes: {
                            value: "start"
                        }
                    }
                }
            ],
            envs: [
                {
                    env: {

                        _attributes: {
                            name: 'hello',
                            value: 'world'
                        }
                    }

                }
            ],
            "node-interpreter": {_attributes: {value: "project"}},
            "package-manager": {_attributes: {value: "npm"}},

        }
    }
}

function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export class WebstormRunConfiguration {
    private static buildEnvObject(env: { readonly [key: string]: string }) : Env[] {
        return Object.keys(env).map(key => {
            return {
                env: {
                        _attributes: {
                            name: key,
                            value: env[key]
                        }
                    }
            }
        })
    }

    private static async saveRunConfig(fileName: string, content: object) {
        const runConfigXml = json2xml(JSON.stringify(content), {compact: true, spaces: 4});
        // const runConfigXml = objectToXml(content);
        console.debug(runConfigXml);
        const ideaFolder = await findUpGlob('.idea')
        fs.writeFileSync(`${ideaFolder}/runConfigurations/${fileName}.xml`, runConfigXml);
    }

    static async saveNodeJsConfig(options: RunConfigurationOptions) {
        const runConfig = deepClone(RunConfigBaseTemplate);
        Object.assign(runConfig.component.configuration._attributes, {
            default: "false",
            name: options.name,
            "application-parameters": options.args,
            nameIsGenerated: "true",
            "path-to-js-file": options.filePath,
            "working-dir": options.workingDir
        })
        Object.assign(runConfig.component.configuration.envs, WebstormRunConfiguration.buildEnvObject(options.env))

        await WebstormRunConfiguration.saveRunConfig(`${options.name}-nodejs`, runConfig)
    }

    static async saveNpmConfig(options: NpmRunConfigurationOptions) {
        const packageJson: any = JSON.parse(fs.readFileSync(options.packageJsonPath, 'utf8'))
        const runConfig : NpmRunConfig = deepClone(NpmRunConfigBaseTemplate);
        runConfig.component.configuration["package-json"]._attributes.value = options.packageJsonPath;
        runConfig.component.configuration._attributes.name = packageJson.name;
        runConfig.component.configuration.envs.push(...WebstormRunConfiguration.buildEnvObject(options.env))
        await WebstormRunConfiguration.saveRunConfig(`${packageJson.name}-npmjs`, runConfig)
    }
}


