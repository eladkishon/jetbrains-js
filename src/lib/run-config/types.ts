export type RunConfigurationOptions = {
    name?: string;
    args: string;
    filePath: string;
    workingDir: string;
    env: {
        [key: string]: string;
    };
}

export type NpmRunConfigurationOptions = {
    packageJsonPath: string;
    env?: {
        [key: string]: string;
    };
};

export type Env = {
    env: {
        _attributes: {
            name: string,
                value: string
        }
    }
}
export type RunConfigBase = {
    component: {
        _attributes: { name: 'ProjectRunConfigurationManager' },
        configuration: {
            _attributes: {
                name: string;
                type: string;
                [key: string]: string;
            }
            envs: Env[]
        }

    }
};

export type NpmRunConfig = RunConfigBase & {
    component: {
        _attributes: { name: 'ProjectRunConfigurationManager' },
        configuration: {
            _attributes: {
                name: string;
                type: string;
                [key: string]: string;
            }
            "package-json": {
                _attributes: {
                    value: string
                }
            }
            "command": {
                _attributes: {
                    value: string
                }
            }
            scripts: [
                {
                    script: {
                        _attributes: {
                            value: string
                        }
                    }
                }
            ]
            "node-interpreter": {
                _attributes: {
                    value: string
                }
            }
            "package-manager": {
                _attributes: {
                    value: "yarn" | "npm"
                }
            }
            envs: Env[]

        }

    }
};
