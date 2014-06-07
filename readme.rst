vimppm - Vimperator Plugin Manager
==================================

Require
-------

* Git
* if you use Windows, you require Windows 7+ or to install PowerShell.


Install
-------

.. code-block:: sh

    cd ~/.vimperator
    mkdir vimppm && cd vimppm
    git clone git://github.com/cd01/vimppm


Usage
-----

Sample `.vimperatorrc`

.. code-block:: vim

    source ~/.vimperator/vimppm/plugin/vimppm/vimppm.js

    " Github
    vimppm 'cd01/evernote-clearly-vimp'
    vimppm 'hoge/hogehoge-vimp'
    vimppm 'homu/homuhomu-vimp'

    " Vimpr
    vimppm '_smooziee.js'
    vimppm 'copy.js'
    vimppm 'caret-hint.js'


run `:vimppm install`

Licence
-------

This software is released under the MIT License, see LICENSE.rst

