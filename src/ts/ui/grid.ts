// 生成九宫格
import * as $ from 'jquery';
import Popup from './popup';

// checker 检查 宫可以使用 $ 类名选择器拼接 text === '123456789'
const rowClass = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
const colClass = ['col_g_left', 'col_g_center', 'col_g_right'];

class Grid {
    private _$container: $;
    private _matrix: number[][];

    constructor(container: $, matrix: number[][]) {
        this._$container = container;
        this._matrix = matrix;
    }

    build(): void {
        const $trMatrix = this._matrix.map((row, i) => (
            $('<tr>').html(
                row.map((item, j) => (
                    $('<td>')
                        .text(item ? item : '')
                        .addClass(rowClass[Math.floor(i / 3)])
                        .addClass(colClass[Math.floor(j / 3)])
                        .addClass(item ? '' : 'empty')
                ))
            )
        ));

        this._$container.html($trMatrix);
    }

    bindPop(popPanel: Popup): void {
        this._$container.on('click', '.empty', (e) => {
            popPanel.pop($(e.target))
        })
    }
}

export default Grid;