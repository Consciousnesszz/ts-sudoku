// 数独生成器
import Toolkit from "./toolkit";

class Generator {
    private _matrix: number[][];
    private _orders: number[][];

    get matrix(): number[][] {
        return this._matrix;
    }

    generate(): number[][] {
        this._matrix = Toolkit.matrix.mkMatrix();
        this._orders = Toolkit.matrix.mkMatrix().map(row => (Toolkit.matrix.shuffle(row.map((v, i) => i))));

        // 拿到一个 length 为 9 的数组调用填写函数
        Toolkit.matrix.mkRow().map((v, i) => this.fillRow(i + 1, 0));

        // 如果还有 0 ，说明失败，需再次调用自身（every 的使用）
        if (!this._matrix.every(row => row.indexOf(0) < 0)) {
            this.generate();
        }

        return this._matrix;
    }

    private fillRow(n: number, rowIndex: number): boolean {
        // 如果 rowIndex > 8，则当前 n 填写完成
        if(rowIndex > 8) {return true};

        // 获取 当前列 以及 0-8 的随机顺序数组
        const row = this._matrix[rowIndex];
        const orders = this._orders[rowIndex];

        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            // 初始值为 0，填入 1-9，如果已填入则跳过
            if (row[colIndex]) {
                continue;
            }
            // 检查所在列，宫是否已填入 n
            if (!Toolkit.matrix.checkFillable(this._matrix, n, rowIndex, colIndex)) {
                continue;
            }

            // 如果当前行填写 n 成功，则递归调用 fillRow 到下一行 
            // --> 如果递归调用后失败，则说明有死区，需恢复上一个位置为 0，同时在当前行寻找下一个
            row[colIndex] = n;
            if(!this.fillRow(n, rowIndex + 1)){
                row[colIndex] = 0;
                continue;
            };

            // 完成一次填写返回正确标识
            return true;
        }

        // 未完成返回失败标识
        return false;
    }
}

export default Generator;
