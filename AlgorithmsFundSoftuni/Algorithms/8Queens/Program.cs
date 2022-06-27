using System;
using System.Collections.Generic;
using System.Text;

namespace _8Queens
{
    internal class Program
    {
        private static char[,] board;
        private static HashSet<int> attackedCols;
        private static HashSet<int> attackedRightDiagonals;
        private static HashSet<int> attackedLeftDiagonals;
        private static int totalSolutions = 0;

        static void Main(string[] args)
        {
            CreateBoard(8);
            attackedCols = new HashSet<int>(); 
            attackedLeftDiagonals = new HashSet<int>();
            attackedRightDiagonals = new HashSet<int>();
            FindPlaceForQueenAtRow(0);
        }

        private static void FindPlaceForQueenAtRow(int row)
        {
            if (row >= board.GetLength(0))
            {
                PrintCurrentBoard();
                totalSolutions++;
            }
            for (int i = 0; i < board.GetLength(1); i++)
            {
                if (attackedCols.Contains(i) || attackedRightDiagonals.Contains(row - i) || attackedLeftDiagonals.Contains(i + row))
                {
                    continue;
                }
                board[row, i] = '*';
                attackedCols.Add(i);
                attackedRightDiagonals.Add(row - i);
                attackedLeftDiagonals.Add(row + i);

                FindPlaceForQueenAtRow(row + 1);
                attackedCols.Remove(i);
                attackedRightDiagonals.Remove(row - i);
                attackedLeftDiagonals.Remove(row + i);
                board[row, i] = '-';
            }
        }

        private static void PrintCurrentBoard()
        {
            for (int i = 0; i < board.GetLength(0); i++)
            {
                var sb = new StringBuilder();
                for (int j = 0; j < board.GetLength(1); j++)
                {
                    sb.Append(board[i, j] + " ");
                }
                Console.WriteLine(sb);
            }
            Console.WriteLine();

        }

        private static void CreateBoard(int v)
        {
            board = new char[v, v];
            for(int i = 0; i < v; i++)
            {
                for(int j = 0; j < v; j++)
                {
                    board[i, j] = '-';
                }
            }
        }
    }
}
