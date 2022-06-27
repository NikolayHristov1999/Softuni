using System;
using System.Collections.Generic;

namespace Salaries
{
    internal class Program
    {
        private static List<int>[] graph;
        private static int[] visited;
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            graph = new List<int>[n];
            visited = new int[n];

            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine();

                graph[i] = new List<int>();

                for (int j = 0; j < n; j++)
                {
                    if (input[j] == 'Y')
                    {
                        graph[i].Add(j);
                    }
                }
            }

            int totalSalary = 0;
            for (int i = 0; i < n; i++)
            {
                if (visited[i] > 0)
                {
                    continue;
                }
                totalSalary += FindSumOfSalaries(i);
            }
            Console.WriteLine(totalSalary);
        }

        private static int FindSumOfSalaries(int node)
        {
            if (visited[node] > 0)
            {
                return visited[node];
            }
            if (graph[node].Count == 0)
            {
                return 1;
            }
            int total = 0;
            foreach (var child in graph[node])
            {
                total += FindSumOfSalaries(child);
            }

            return total;
        }
    }
}
