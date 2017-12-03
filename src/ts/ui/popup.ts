// 管理弹出输入框
import * as $ from 'jquery';

class Popup {

    private _$panel: $;
    private _$item: $;
    private _puzzleMatrix: number[][];

    constructor ($panel: $) {
        this._$panel = $panel.hide();
    }

    pop($item: $): void {
        const { left, top } = $item.position();
        this._$panel
            .css({
                left: left + 'px',
                top: top + 'px'
            })
            .show();

        this._$item = $item;
    }

    bindInput(puzzleMatrix: number[][]): void {
        this._puzzleMatrix = puzzleMatrix;

        this._$panel.on('click', 'td', (e) => {

            const $target = $(e.target);

            if($target.hasClass('red')) {
                this._$item
                    .removeClass('green')
                    .addClass('red');
            } else if ($target.hasClass('green')) {
                this._$item
                    .removeClass('red')
                    .addClass('green');
            } else if ($target.hasClass('white')) {
                this._$item
                    .text('')
                    .removeClass('green red');
            } else {
                this._$item.text($target.text());
                this._puzzleMatrix[this._$item.parent().index()][this._$item.index()] = +$target.text();
            }

            this._$panel.hide();
        })
    }
}

export default Popup;
