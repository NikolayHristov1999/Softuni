using System;
using System.Collections.Generic;

namespace CyclesInGraph
{
    internal class Program
    {
        private static Dictionary<string, List<string>> graph;
        private static HashSet<string> visited;
        private static HashSet<string> cycles;
        static void Main(string[] args)
        {
            string input = Console.ReadLine();
            graph = new Dictionary<string, List<string>>();
            visited = new HashSet<string>();
            cycles = new HashSet<string>();

            while(input != "End")
            {
                var nodes = input.Split("-");
                if (!graph.ContainsKey(nodes[0]))
                {
                    graph.Add(nodes[0], new List<string>());
                }

                if (!graph.ContainsKey(nodes[1]))
                {
                    graph.Add(nodes[1], new List<string>());
                }
                graph[nodes[0]].Add(nodes[1]);
                input = Console.ReadLine();
            }
            try
            {
                foreach (var node in graph)
                {
                    DFS(node.Key);
                }
                Console.WriteLine("Acyclic: Yes");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Acyclic: No");
            }

            

        }

        private static void DFS(string node)
        {
            if (cycles.Contains(node))
            {
                throw new InvalidOperationException();
            }
            if (visited.Contains(node))
            {
                return;
            }
            visited.Add(node);
            cycles.Add(node);

            foreach (var child in graph[node])
            {
                DFS(child);
            }
            cycles.Remove(node);
        }
    }
}
