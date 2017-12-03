// 工具库
/**
 * 矩阵工具库
 */ 
class MatrixToolkit {

    static mkRow(): number[];
    static mkRow<T>(v: T): T[];
    static mkRow(v:any = 0):any[] {
        return new Array(9).fill(v)
    }

    static mkMatrix(): number[][];
    static mkMatrix<T>(v:T): T[][]; 
    static mkMatrix(v: any = 0): any[][] {
        return  Array.from({ length: 9 }, () => this.mkRow(v))
    }

    static shuffle<T>(arr: T[]):T[] {
        arr.map((item, i) => {
            if (i < arr.length - 1) {
                let randomNum = Math.round(Math.random() * (arr.length - 1 - i));
                [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
            }
        });
        return arr;
    }

    static checkFillable(matrix: number[][], n: number, rowIndex: number, colIndex: number):boolean {
        const { getRow, getCol, getPalace } = coordinateToolkit;
        if (getRow(matrix, rowIndex).indexOf(n) < 0 && getCol(matrix, colIndex).indexOf(n) < 0 && getPalace(matrix, rowIndex, colIndex).indexOf(n) < 0) {
            return true;
        }
        return false;
    }
}

/**
 * 坐标系工具
 */
const coordinateToolkit = {
    getRow: (matrix: number[][], rowIndex: number): number[] => {
        return matrix[rowIndex];
    },

    getCol: (matrix: number[][], colIndex: number): number[] => {
        return matrix.map(row => (row[colIndex]));
    },

    getPalace: (matrix: number[][], rowIndex: number, colIndex: number): number[] => {
        let palaceArr = [],
            startRow = Math.floor(rowIndex / 3) * 3,
            startCol = Math.floor(colIndex / 3) * 3;

        matrix.map((row, i) => {
            if(i >= startRow && i < startRow + 3) {
                row.map((item, j) => {
                    if(j >= startCol && j < startCol + 3) {
                        palaceArr.push(item);
                    }
                })
            }
        })
        return palaceArr;
    }
}

export default class Toolkit {
    static get matrix(): typeof MatrixToolkit {
        return MatrixToolkit;
    }

    static get coordinate() {
        return coordinateToolkit;
    }
};
