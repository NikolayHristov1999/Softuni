using System;
using System.Collections.Generic;
using System.Linq;

namespace ConnecterAreas
{
    public class Area
    {
        public Area(int row, int col, int size)
        {
            Row = row;
            Col = col;
            Size = size;
        }

        public int Row { get; set; }

        public int Col { get; set; }

        public int Size { get; set; }

    }
    internal class Program
    {
        private static bool[,] visited;
        private static char[,] matrix;
        private static int size;
        private static List<Area> areas;

        static void Main(string[] args)
        {
            int rows = int.Parse(Console.ReadLine());
            int cols = int.Parse(Console.ReadLine());
            matrix = new char[rows, cols];
            areas = new List<Area>();

            for (int i = 0; i < rows; i++)
            {
                var str = Console.ReadLine();
                for (int j = 0; j < cols; j++)
                {
                    matrix[i, j] = str[j];
                }
            }

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    size = 0;
                    FindConnectedAreas(i, j);
                    if (size != 0)
                    {
                        areas.Add(new Area(i, j, size));
                    }
                }
            }

            areas = areas.OrderByDescending(x => x.Size).ToList();
            Console.WriteLine("Total areas found: " + areas.Count);
            for (int i = 0; i < areas.Count; i++)
            {
                Console.WriteLine($"Area #{i + 1} at ({areas[i].Row}, {areas[i].Col}), size: {areas[i].Size}");
            }
        }

        private static void FindConnectedAreas(int row, int col)
        {
            if (row < 0 || col < 0 || row >= matrix.GetLength(0) || col >= matrix.GetLength(1))
            {
                return;
            }
            if (matrix[row, col] == '*')
            {
                return;
            }
            matrix[row, col] = '*';
            size++;

            FindConnectedAreas(row - 1, col);
            FindConnectedAreas(row, col + 1);
            FindConnectedAreas(row + 1, col);
            FindConnectedAreas(row, col - 1);
        }
    }
}
