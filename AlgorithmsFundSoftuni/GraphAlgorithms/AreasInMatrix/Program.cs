using System;
using System.Collections.Generic;
using System.Linq;

namespace AreasInMatrix
{
    internal class Program
    {
        private static char[,] matrix;
        private static bool[,] visited;
        private static Dictionary<char, int> areas;

        static void Main(string[] args)
        {
            var rows = int.Parse(Console.ReadLine());
            var cols = int.Parse(Console.ReadLine());
            var totalAreas = 0;

            matrix = new char[rows, cols];
            visited = new bool[rows, cols];
            areas = new Dictionary<char, int>();

            for (int i = 0; i < rows; i++)
            {
                var input = Console.ReadLine();
                for (int j = 0; j < cols; j++)
                {
                    matrix[i, j] = input[j];
                }
            }

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    char c = matrix[i, j];
                    if (visited[i, j])
                    {
                        continue;
                    }

                    DiscoverArea(i, j, c);
                    if (!areas.ContainsKey(c))
                    {
                        areas.Add(c, 0);
                    }
                    areas[c]++;
                    totalAreas++;
                }
            }
            areas = areas.OrderBy(x => x.Key).ToDictionary(x => x.Key, v => v.Value);
            Console.WriteLine("Areas: " + totalAreas);
            foreach (var c in areas)
            {
                Console.WriteLine($"Letter '{c.Key}' -> {c.Value}");
            }
        }

        static void DiscoverArea(int row, int col, char c)
        {
            if (!IsValidIndex(row, col) || !IsTheSameArea(row, col, c))
            {
                return;
            }

            visited[row, col] = true;

            DiscoverArea(row - 1, col, c);
            DiscoverArea(row, col - 1, c);
            DiscoverArea(row + 1, col, c);
            DiscoverArea(row, col + 1, c);

        }

        private static bool IsValidIndex(int row, int col)
        {
            if (row < 0 || col < 0 || row >= matrix.GetLength(0) || col >= matrix.GetLength(1) )
            {
                return false;
            }
            return true;
        }

        private static bool IsTheSameArea(int row, int col, char c)
        {
            if (matrix[row, col] != c || visited[row, col] == true)
            {
                return false;
            }
            return true;
        }
    }
}
