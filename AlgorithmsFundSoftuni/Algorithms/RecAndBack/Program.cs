using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RecAndBack
{
    internal class Program
    {
        private static char[,] labyrinth;
        private static List<char> path;
        private static bool[,] visited;


        static void Main(string[] args)
        {
            //var arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            //var arr = new int[] {1, 3, 7, 4, 9, 5};
            //Console.WriteLine(GetFactorial(10));
            //DrawFigure(int.Parse(Console.ReadLine()));
            //GenVect(int.Parse(Console.ReadLine()));
            ReadLab();
            FindAllPaths(0, 0);
        }

        private static void FindAllPaths(int row, int col, char direction = 'S')
        {
            if (row < 0 || col < 0 || row >= labyrinth.GetLength(0) || col >= labyrinth.GetLength(1))
            {
                return;
            }
            if (labyrinth[row, col] == '*' || visited[row,col] == true)
            {
                return;
            }
            if (labyrinth[row, col] == 'e')
            {
                Console.WriteLine((string.Join("", path)) + direction);
                return;
            }
            if (direction != 'S')
            {
                path.Add(direction);
            }

            visited[row, col] = true;
            FindAllPaths(row, col + 1, 'R');
            FindAllPaths(row + 1, col, 'D');
            FindAllPaths(row - 1, col, 'U');
            FindAllPaths(row, col - 1, 'L');
            visited[row, col] = false;

            if (path.Count > 0)
            {
                path.RemoveAt(path.Count - 1);
            }

        }

        static int RecursiveSumArray(int[] arr, int index)
        {
            if (index >= arr.Length)
            {
                return 0;
            }
            return arr[index] + RecursiveSumArray(arr, index + 1);
        }

        static long GetFactorial(int num)
        {
            if (num != 0)
            {
                return num * GetFactorial(num - 1); 
            }
            return 1;
        }

        static void DrawFigure(int count)
        {
            if (count == 0)
            {
                return;
            }
            DrawLine(count, '*');
            DrawFigure(count - 1);
            DrawLine(count, '#');
            
        }
        static void DrawLine(int count, char symbol)
        {
            var sb = new StringBuilder();
            for (int i = 0; i < count; i++)
            {
                sb.Append(symbol);
            }
            Console.WriteLine(sb);
        }
        static void GenVect(int count)
        {
            GenVect01(new int[count], 0);
        }

        static void GenVect01(int[] vector, int currentIndex = 0)
        {
            if(currentIndex >= vector.Length)
            {
                Console.WriteLine(string.Join("", vector.ToList()));
                return;
            }
            vector[currentIndex] = 0;
            GenVect01(vector, currentIndex + 1);
            vector[currentIndex] = 1;
            GenVect01(vector, currentIndex + 1);
        }

        static void ReadLab()
        {
            path = new List<char>();
            int rows = int.Parse(Console.ReadLine());
            int cols = int.Parse(Console.ReadLine());
            labyrinth = new char[rows, cols];
            visited = new bool[rows, cols];
            for (int i = 0; i < rows; i++)
            {
                var line = Console.ReadLine();
                for (int j = 0; j < cols; j++)
                {
                    labyrinth[i, j] = line[j];
                    visited[i, j] = false;
                }
            }
        }
    }
}
