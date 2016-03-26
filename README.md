# vimppm - Vimperator Plugin Manager (Experimental)

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Require

* Git
* if you use Windows, you require Windows 7+ or to install PowerShell.


# Install

``` sh
cd ~/.vimperator
mkdir vimppm && cd vimppm
git clone git://github.com/cd01/vimppm
```

# Usage

Sample `.vimperatorrc`

``` vim
source ~/.vimperator/vimppm/plugin/vimppm/vimppm.js

" Github
vimppm 'cd01/evernote-clearly-vimp'
vimppm 'hoge/hogehoge-vimp'
vimppm 'homu/homuhomu-vimp'

" Vimpr
vimppm '_smooziee.js'
vimppm 'copy.js'
vimppm 'caret-hint.js'
```

run `:vimppm install`
