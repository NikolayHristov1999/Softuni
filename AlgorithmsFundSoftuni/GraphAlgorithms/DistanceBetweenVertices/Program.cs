using System;
using System.Collections.Generic;
using System.Linq;

namespace DistanceBetweenVertices
{
    internal class Program
    {
        private static Dictionary<string, List<string>> graph;
        static void Main(string[] args)
        {
            var nodes = int.Parse(Console.ReadLine());
            var pairs = int.Parse(Console.ReadLine());
            graph = new Dictionary<string, List<string>>();

            for (int i = 0; i < nodes; i++)
            {
                var input = Console.ReadLine().Split(":", StringSplitOptions.RemoveEmptyEntries);
                var node = input[0];
                graph[node] = new List<string>();
                if (input.Length > 1)
                {
                    graph[node] = input[1].Split().ToList();
                }
            }

            for (int i = 0; i < pairs; i++)
            {
                var input = Console.ReadLine().Split("-");
                FindShortestPath(input[0], input[1]);
            }
            
        }

        private static void FindShortestPath(string startNode, string endNode)
        {
            var children = new Queue<string>();
            var path = new Dictionary<string, List<string>>();
            var pathFound = false;

            path.Add(startNode, new List<string>());
            path[startNode].Add(startNode);
            children.Enqueue(startNode);

            while (children.Count > 0)
            {
                var node = children.Dequeue();
                if (node == endNode)
                {
                    pathFound = true;
                    break;
                }

                foreach (var child in graph[node])
                {
                    if (path.ContainsKey(child))
                    {
                        continue;
                    }
                    path.Add(child, new List<string>(path[node]));
                    path[child].Add(child);
                    children.Enqueue(child);
                }
            }
            Console.Write($"{{{startNode}, {endNode}}} -> ");
            if (pathFound)
            {
                Console.WriteLine(path[endNode].Count - 1);
            }
            else
            {
                Console.WriteLine(-1);
            }
        }
    }
}
