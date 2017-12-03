// 根据难度生成数独
import Generator from './generator';

class Sudoku {
    private _level: number;
    private _puzzleMatrix: number[][];

    constructor(level:number = 5) {
        this._level = level;
        this._puzzleMatrix = new Generator().generate().map(row => (
            row.map(item => Math.random() * 9 > level ? item : 0)
        ));
    }

    get puzzle(): number[][] {
        return this._puzzleMatrix;
    }
}

export default Sudoku;
