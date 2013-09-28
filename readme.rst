vimppm - Vimperator Plugin Manager
==================================

Require
-------

* Git
* if you use Windows, you require Windows 7+ or to install PowerShell.


Install
-------

.. code-block::

    cd ~/.vimperator
    mkdir vimppm && cd vimppm
    git clone git://github.com/cd01/vimppm

    " .vimperatorrc
    source ~/.vimperator/vimppm/plugin/vimppm/vimppm.js


Usage
-----

.. code-block::

    " .vimperatorrc
    vimppm 'cd01/evernote-clearly-vimp'
    vimppm 'hoge/hogehoge-vimp'
    vimppm 'homu/homuhomu-vimp'


.. code-block::

    vimppm install " Install
    vimppm update  " Update all


