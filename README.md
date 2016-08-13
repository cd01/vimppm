# vimppm - Vimperator Plugin Manager (Experimental)

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Require

* Git command

# Install

``` sh
git clone https://github.com/cd01/vimppm.git ~/.vimperator/vimppm
```

# Usage

Sample `.vimperatorrc`

``` vim
source ~/.vimperator/vimppm/plugin/vimppm/vimppm.js

" Github
vimppm 'cd01/suddendeath-vimp'
vimppm 'hoge/hogehoge-vimp'

" Vimpr
vimppm '_smooziee.js'
vimppm 'copy.js'
vimppm 'caret-hint.js'
```

run `:vimppm install`
