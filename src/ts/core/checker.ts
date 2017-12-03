// 检查数独数据
import Toolkit from "./toolkit";

// 输入： 用户填入数独数据 matrix
// 处理： 检查 matrix 行、列、宫，返回 marks
// 输出： 结果，marks
class Checker {
    private _success: boolean;
    private _matrix: number[][];
    private _marks: boolean[][];

    constructor(matrix) {
        this._success = false;
        this._matrix = matrix;
        this._marks = Toolkit.matrix.mkMatrix(true);
    }

    get status(): boolean {
        return this._success;
    }

    get marks(): boolean[][] {
        return this._marks;
    }

    check(): boolean {
        this.checkRow();
        this.checkCol();
        this.checkPalace();

        // 检查是否成功：所有行都返回 true 才返回 true
        this._success = this._marks.every(row => row.every(mark => mark));
        return this._success;
    }

    private checkArr(arr): boolean[] {
        // 1. item = 0
        // 2. 从当前位找后面能找到重复的
        // 3. 当前位找后面不能找到重复时，找前面是否重复 (专门处理当前是重复元素最后一位的情况)
        return arr.map((item, i) => (
            !item || arr.indexOf(item, i + 1) > 0 || arr.indexOf(item) !== i ? false : true
        ))
    }

    private checkRow(): void {
        this._marks = this._matrix.map((row) => this.checkArr(row));
    }

    private checkCol(): void {
        Toolkit.matrix.mkRow().map((v, colIndex) => {
            this.checkArr(Toolkit.coordinate.getCol(this._matrix, colIndex))
                .map((item, rowIndex) => item ? null : (this._marks[rowIndex][colIndex] = false));
        })
    }

    private checkPalace(): void {
        const indexArr = [0,3,6];
        indexArr.map(rowIndex => {
            indexArr.map(colIndex => {
                this.checkArr(Toolkit.coordinate.getPalace(this._matrix, rowIndex, colIndex))
                    .map((item, palaceIndex) => {
                        if(!item) {
                            const rowOffset = Math.floor(palaceIndex / 3),
                                  colOffset = palaceIndex % 3;
                            this._marks[rowIndex + rowOffset][colIndex + colOffset] = false;
                        }
                    })
            })
        })
    }
}

export default Checker;