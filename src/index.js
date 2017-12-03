// 项目入口文件
import $ from 'jquery';

import Sudoku from './ts/core/sudoku.ts';
import Checker from './ts/core/checker.ts';

import Grid from './ts/ui/grid';
import Popup from './ts/ui/popup';

import style from './less/index.less';

let sudoku, grid, checker;

const popPanel = new Popup($('#popPanel'));

const init = (bindType) => {
    sudoku = new Sudoku($('#levelSel').val());

    grid = new Grid($('#container table'), sudoku.puzzle);
    grid.build();

    if (bindType) {
        grid.bindPop(popPanel);
    }

    checker = new Checker(sudoku.puzzle);
    popPanel.bindInput(sudoku.puzzle);
}

init('firstBind');

$('#check').on('click', () => {
    if(checker.check()) {
        alert('you did it!~');
    } else {
        checker.marks.map((row, i) => {
            row.map((item, j) => {
                if(!item) {
                    $('#container table tr').eq(i).children('td').eq(j).addClass('wrong');
                }
            })
        })
    }
})

$('#clear').on('click', () => {
    $('.wrong').removeClass('wrong');
})

$('#reset').on('click', () => {
    $('.empty').text('').removeClass('red green');
})

$('#rebuild').on('click', () => {
    init();
})
