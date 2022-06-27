using System;
using System.Collections.Generic;
using System.Linq;

namespace BreakCycles
{
    internal class Program
    {
        private static Dictionary<string, List<string>> graph;
        private static List<Tuple<string, string>> edges;
        private static HashSet<string> edgesToRemove;
        private static List<string> removedEdges;

        static void Main(string[] args)
        {
            graph = new Dictionary<string, List<string>>();
            edges = new List<Tuple<string, string>>();
            edgesToRemove = new HashSet<string>();
            removedEdges = new List<string>();
            var n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine().Split(" ->");
                graph.Add(input[0], new List<string>());

                if (input.Length > 1)
                {
                    var children = input[1].Split(" ",StringSplitOptions.RemoveEmptyEntries);

                    foreach (var child in children)
                    {
                        graph[input[0]].Add(child);
                        edges.Add(new Tuple<string, string>(input[0], child));
                    }
                }
            }
            edges = edges
                .OrderBy(x => x.Item1)
                .ThenBy(x => x.Item2)
                .ToList();

            foreach (var edge in edges)
            {
                if (edgesToRemove.Contains($"{edge.Item2} - {edge.Item1}"))
                {
                    continue;
                }

                graph[edge.Item1].Remove(edge.Item2);
                
                try
                {
                    IsEdgeInCycle(edge.Item1, edge.Item2);
                    graph[edge.Item1].Add(edge.Item2);
                }
                catch (Exception ex)
                {
                    graph[edge.Item2].Remove(edge.Item1);
                    edgesToRemove.Add($"{edge.Item1} - {edge.Item2}");
                    removedEdges.Add($"{edge.Item1} - {edge.Item2}");
                }
            }
            Console.WriteLine("Edges to remove: " + removedEdges.Count);
            foreach (var edgesRemoved in removedEdges)
            {
                Console.WriteLine(edgesRemoved);
            }
        }

        private static void IsEdgeInCycle(string startNode, string endNode)
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
                throw new InvalidOperationException();
            }
        }
    }
}
