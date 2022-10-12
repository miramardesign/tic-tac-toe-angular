import { Component, OnInit } from '@angular/core';
const nullRow = [null, null, null];

enum markOptions {
  X = "X",
  O = "O"
 }
@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  turnX: boolean = true; //make enum...
  hasWinner: boolean = false;
  winType = '';
  ticTacToeData: any[] = [[...nullRow], [...nullRow], [...nullRow]];

  //mineData: any[] = [];
  n: number = 8;
  mineData: string[][] = new Array(this.n)
                                   .fill('')
                                   .map(() => 
                                     new Array(this.n).fill('')
                                   );

  arr = new Array<number>(3);

  goTurn(iRow: number, iCol: number, turnX: boolean) {
    let sqValue = turnX ? markOptions.X : markOptions.O;
    if (this.hasWinner) {
      return;
    }

    this.setSqValue(iRow, iCol, sqValue);

    if (this.isWinCondition(this.ticTacToeData)) {
      console.log('win condition.');
      this.hasWinner = true;
    }
  }

  setSqValue(iRow: number, iCol: number, sqValue: any) {
    if (this.ticTacToeData[iRow][iCol] === null) {
      console.log('----go x called', iRow, iCol, sqValue);

      this.turnX = !this.turnX;
      this.ticTacToeData[iRow][iCol] = sqValue;
    } else {
      console.log('NOT null----cannot change an existing mark-');
    }
  }

  //detect rows from data.
  isWinCondition(xoData: any[]) {

    let winRowI = this.hasRowWin(xoData);
    
    if (winRowI > -1 ) {
      this.winType = 'row-' + winRowI ;
      return true;
    }

    let winColI = this.hasColWin(xoData);

    if (winColI > -1) {
      this.winType = 'col-' + winColI;
      return true;
    }
    
    let winDiagI = this.hasDiagWin(xoData);

    if (winDiagI > -1 ) {
      this.winType = 'diag-' + winDiagI;
      return true;
    }

    return false;
  }

  /**
   * 
   * @param xoData 
   * @returns 
   */
  hasRowWin(xoData: any[]):number {
    let rowWin = false;
    let rowWinI = -1;
    xoData.map((row, index) => {
      if (row.join('') === 'XXX') {
        rowWin = true;
        rowWinI = index
      }
      if (row.join('') === 'OOO') {
        rowWin = true;
        rowWinI = index
      }
    });

    return rowWinI;
  }

  hasColWin(xoData: any[]): number {
    //flip the cols to row so i can reuse row bool for rows
    let col0 = [xoData[0][0], xoData[1][0], xoData[2][0]];
    let col1 = [xoData[0][1], xoData[1][1], xoData[2][1]];
    let col2 = [xoData[0][2], xoData[1][2], xoData[2][2]];
    let colDataAsRow = [col0, col1, col2];

    return this.hasRowWin(colDataAsRow);
  }

  hasDiagWin(xoData: any[]) :number {
    let diagWin = false;
    let diagWinI = -1;

    let centerSq = xoData[1][1];

    if (centerSq === null) {
      return diagWinI;
    }

    let hasTopLeftToBtmRightWin =
      xoData[0][0] === centerSq && xoData[2][2] === centerSq;

    if (hasTopLeftToBtmRightWin) {
      diagWinI = 0;
    }

    let hasTopRightToBtmLeftWin =
      xoData[0][2] === centerSq && xoData[2][0] === centerSq;

    if (hasTopRightToBtmLeftWin) {
      diagWinI = 1;
    }

    diagWin = hasTopLeftToBtmRightWin || hasTopRightToBtmLeftWin;

    return diagWinI;

  }

  reset() {
    this.ticTacToeData = [[...nullRow], [...nullRow], [...nullRow]];

    this.winType = '';
    this.turnX = true;
    this.hasWinner = false;
  }

}


