using System;
using System.Collections.Generic;

namespace ShortestPath
{
    internal class Program
    {
        private static Dictionary<string, List<string>> graph;
        static void Main(string[] args)
        {
            var nodes = int.Parse(Console.ReadLine());
            var edges = int.Parse(Console.ReadLine());
            graph = new Dictionary<string, List<string>>();

            for (int i = 0; i < edges; i++)
            {
                var input = Console.ReadLine().Split();
                var edgeA = input[0];
                var edgeB = input[1];

                //Add the connection to the other node 
                if (!graph.ContainsKey(edgeA))
                {
                    graph.Add(edgeA, new List<string>());
                }
                graph[edgeA].Add(edgeB);
                if (!graph.ContainsKey(edgeB))
                {
                    graph.Add(edgeB, new List<string>());
                }
                graph[edgeB].Add(edgeA);
            }

            var startNode = Console.ReadLine();
            var endNode = Console.ReadLine();
            FindShortestPath(startNode, endNode);
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

            if (pathFound)
            {
                Console.WriteLine($"Shortest path length is: {path[endNode].Count - 1}");
                Console.WriteLine(String.Join(" ",path[endNode]));
            }
        }
    }
}
