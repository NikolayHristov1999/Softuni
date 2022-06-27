using System;
using System.Collections.Generic;
using System.Linq;

namespace ConnectedComponents
{
    internal class Program
    {
        private static List<List<int>> adjacencyList;
        private static bool[] visited;
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            adjacencyList = new List<List<int>>();
            visited = new bool[n];
            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine();
                if (string.IsNullOrWhiteSpace(input))
                {
                    adjacencyList.Add(new List<int>());
                    continue;
                }
                adjacencyList.Add(input.Split().Select(int.Parse).ToList());
            }

            for (int i = 0; i < adjacencyList.Count; i++)
            {
                var connectedComponents = new List<int>();
                if (!visited[i])
                {
                    Console.Write($"Connected component:");

                    DFSConnectedComponents(connectedComponents, i);
                    //Console.WriteLine($"Connected component: {string.Join(" ", connectedComponents)}");
                    Console.WriteLine();
                }
            }
        }

        private static void DFSConnectedComponents(List<int> connectedComponents, int node)
        {
            if (visited[node])
            {
                return;
            }
            visited[node] = true;
            //connectedComponents.Add(node);

            //for (int i = 0; i < adjacencyList[node].Count; i++)
            //{
            //    DFSConnectedComponents(connectedComponents, adjacencyList[node][i]);
            //}
            foreach(var child in adjacencyList[node])
            {
                DFSConnectedComponents(connectedComponents, child);
            }
            Console.Write(" " + node);
        }
    }
}
