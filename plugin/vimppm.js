// vimppm
// Copyright (c) 2016 CD01
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

// INFO {{{
var INFO = xml`
    <plugin name="vimppm" version="0.0.3"
            href="https://github.com/cd01/vimppm"
            summary="Vimperator Plugin Manager"
            lang="en"
            xmlns="http://vimperator.org/namespaces/liberator">
        <author>CD01</author>
        <license>MIT</license>
        <project name="Vimperator" minVersion="3.7"/>
        <p>
            Vimppm
        </p>

        <item>
            <tags>:vimppm</tags>
            <spec>:vimppm</spec>
            <description>
                <p>
                    manage plugin by vimppm
                </p>
            </description>
        </item>

        <item>
            <tags>:vimppm install</tags>
            <spec>:vimppm install</spec>
            <description>
                <p>
                    install all bundled plugins
                </p>
            </description>
        </item>

        <item>
            <tags>:vimppm update</tags>
            <spec>:vimppm update</spec>
            <description>
                <p>
                    update all bundled plugins
                </p>
            </description>
        </item>
    </plugin>`;
// }}}

var gitCommand = (liberator.globalVariables.vimppm_git_command) ? liberator.globalVariables.vimppm_git_command : 'git';
var gitProtocol = (liberator.globalVariables.vimppm_git_protocol) ? liberator.globalVariables.vimppm_git_protocol : 'https';
var vimppmDirPath = getVimppmDir();

function getVimppmDir() {
    var vimperatorDir = io.File(io.expandPath("~/.vimperator"));

    if (vimperatorDir.exists()) { return "~/.vimperator/vimppm"; }

    vimperatorDir = io.File(io.expandPath("~/vimperator"));

    if (vimperatorDir.exists()) { return "~/vimperator/vimppm"; }

    vimperatorDir = io.File(io.expandPath("~/_vimperator"));

    if (vimperatorDir.exists())
        return "~/_vimperator/vimppm";
    else
        return false;
}

function isGithubRepository(repositoryName) {
    return (repositoryName.indexOf('/') !== -1);
}

function isDirectory(path) {
    var pluginDir = io.File(io.expandPath(path));
    return (pluginDir.exists() && pluginDir.isDirectory());
}

function installFromGithub(vimppmRepositoryName) {
    var pluginDirPath = vimppmDirPath + '/' + vimppmRepositoryName.split('/')[1];
    if (!isDirectory(pluginDirPath)) {
        liberator.execute('!' + gitCommand + ' clone ' + gitProtocol + '://github.com/' + vimppmRepositoryName + '.git ' + io.expandPath(pluginDirPath));
        liberator.echo("Vimperator plugins are installed!! Please, restart vimperator.");
        return true;
    } else {
        liberator.echoerr(vimppmRepositoryName + ' already exists!');
        return false;
    }
}

function gitPull(vimppmRepositoryName) {
    var pluginDirPath = vimppmDirPath + '/' + vimppmRepositoryName.split('/')[1];
    if (isDirectory(pluginDirPath)) {
        liberator.execute('!' + gitCommand + ' pull ' + io.expandPath(pluginDirPath));
        liberator.echo("Vimperator plugins are updated!! Please, restart vimperator.");
        return true;
    } else {
        liberator.echoerr(vimppmRepositoryName + " isn't installed");
        return false;
    }
}

function installTwittperatorFromVimpr(pluginName) {
    // TODO:
    // %TMP% に git clone
    // mv Twittperator
    // rmdir %TMP%Twittperator
}

function installFromVimpr(pluginName) {
    var pluginDirPath = vimppmDirPath + '/' + pluginName;
    if (!isDirectory(pluginDirPath)) {
        // Create a plugin directory
        var destPath = io.expandPath(pluginDirPath + '/plugin/' + pluginName)
        var dir = io.File(pluginDirPath + '/plugin/');
        if (!dir.exists() || !dir.isDirectory()) { dir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0664); }

        // Download a js file
        var downloadUrl = 'https://raw.githubusercontent.com/vimpr/vimperator-plugins/master/' + pluginName;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", downloadUrl, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var f = io.File(destPath)
                    f.write(xhr.responseText);
                    liberator.echo("Downloaded " + pluginName, true);
                    liberator.echo("Vimperator plugins are installed!! Please, restart vimperator.");
                } else {
                    liberator.echoerr(downloadUrl + ": " + xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) { liberator.echoerr(downloadUrl + ": " + xhr.statusText); };
        xhr.send(null);

        return true;
    } else {
        liberator.echoerr(pluginName + ' already exists!');
        return false;
    }
}

function updateFromVimpr(pluginName) {
    var pluginDirPath = vimppmDirPath + '/' + pluginName;
    if (isDirectory(pluginDirPath)) {
        // Download a js file
        var downloadUrl = 'https://raw.githubusercontent.com/vimpr/vimperator-plugins/master/' + pluginName;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", downloadUrl, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var f = io.File(destPath)
                    f.write(xhr.responseText);
                    liberator.echo("Downloaded " + pluginName, true);
                    liberator.echo("Vimperator plugins are updated!! Please, restart vimperator.");
                } else {
                    liberator.echoerr(downloadUrl + ": " + xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) { liberator.echoerr(downloadUrl + ": " + xhr.statusText); };
        xhr.send(null);

        return true;
    } else {
        liberator.echoerr(pluginName + " isn't installed");
        return false;
    }
}


(function () {
    var vimppmRepository = [];

    commands.addUserCommand(
        ['vimppm'], 'VIMPeratorPluginManage command',
        function(args) {
            // vimppm "cd01/plugin-vimp" "{'hoge': 'hogehoge'}"
            // JSON.parse(args[1]).hoge;

            var repositoryName = args[0];
            if (isGithubRepository(repositoryName)) repositoryName = repositoryName.split('/')[1];
            var pluginDirPath = vimppmDirPath + '/' + repositoryName;

            if (isDirectory(pluginDirPath)) { liberator.execute('set rtp+=' + pluginDirPath); }

            vimppmRepository.push(args[0]);
        }, {
            subCommands: [
                new Command(
                    ['install'], 'install plugin',
                    function (args) {
                        if (args == "") {
                            for (var i = 0; i < vimppmRepository.length; i++) {
                                if (isGithubRepository(vimppmRepository[i]))
                                    installFromGithub(vimppmRepository[i]);
                                else
                                    installFromVimpr(vimppmRepository[i]);
                            }
                        } else {
                            if (isGithubRepository(args))
                                installFromGithub(args);
                            else
                                installFromVimpr(args);
                        }
                    }
                ),
                new Command(
                    ['update'], 'update plugin',
                    function (args) {
                        if (args == "") {
                            for (var i = 0; i < vimppmRepository.length; i++) {
                                if (isGithubRepository(vimppmRepository[i]))
                                    gitPull(vimppmRepository[i]);
                                else
                                    updateFromVimpr(vimppmRepository[i]);
                            }
                        } else {
                            if (isGithubRepository(args[0]))
                                gitPull(args[0]);
                            else
                                updateFromVimpr(args[0]);
                        }

                        liberator.echo("Vimperator plugins are updated. Please, restart vimperator.");
                    }
                )
            ]
        }
    );
})();

// vim:sw=4 ts=4 et fdm=marker:
