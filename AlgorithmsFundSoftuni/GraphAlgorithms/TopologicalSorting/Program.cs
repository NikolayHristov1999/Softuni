using System;
using System.Collections.Generic;
using System.Linq;

namespace TopologicalSorting
{
    internal class Program
    {
        private static Dictionary<string, List<string>> graph;
        private static HashSet<string> visited;
        private static HashSet<string> cycles;
        //private static Dictionary<string, int> predecessorsCount;
        //private static List<string> nodes;
        //private static List<string> topologicalSort;

        static void Main(string[] args)
        {
            graph = new Dictionary<string, List<string>>();
            var n = int.Parse(Console.ReadLine());
            visited = new HashSet<string>();
            cycles = new HashSet<string>();

            //predecessorsCount = new Dictionary<string,int>();
            //nodes = new List<string>();
            //topologicalSort = new List<string>();
            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine().Split(" ->", StringSplitOptions.RemoveEmptyEntries);
                var node = input[0];
                graph.Add(node, new List<string>());
                if (input.Length > 1)
                {
                    var children = input[1].Split(", ");
                    foreach (var childToTrim in children)
                    {
                        var child = childToTrim.Trim();
                        graph[node].Add(child);
                    }
                }
            }
            TopSort();
            //for (int i = 0; i < n; i++)
            //{
            //    var input = Console.ReadLine().Split(" ->", StringSplitOptions.RemoveEmptyEntries);
            //    var node = input[0];
            //    graph.Add(node, new List<string>());
            //    nodes.Add(node);
            //    if (!predecessorsCount.ContainsKey(node))
            //    {
            //        predecessorsCount.Add(node, 0);
            //    }

            //    if (input.Length > 1)
            //    {
            //        var children = input[1].Split(", ");
            //        foreach (var childToTrim in children)
            //        {
            //            var child = childToTrim.Trim();
            //            graph[node].Add(child);
            //            if (!predecessorsCount.ContainsKey(child))
            //            {
            //                predecessorsCount.Add(child, 0);
            //            }
            //            predecessorsCount[child]++;
            //        }
            //    }
            //}
            //TopologicalSort();
        }
        private static void TopSort()
        {
            var sorted = new Stack<string>();
            foreach(var node in graph.Keys)
            {
                DFSToplogicalSort(node, sorted);
            }
            Console.WriteLine($"Topological sorting: {string.Join(", ", sorted)}");
        }
        private static void DFSToplogicalSort(string node, Stack<string> sorted)
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
                DFSToplogicalSort(child, sorted);
            }

            sorted.Push(node);
            cycles.Remove(node);
        }

        //private static void TopologicalSort()
        //{
        //    while (nodes.Count > 0)
        //    {
        //        var node = predecessorsCount
        //            .FirstOrDefault(x => x.Value == 0);
        //        if (node.Key == null)
        //        {
        //            break;
        //        }
        //        foreach(var child in graph[node.Key])
        //        {
        //            predecessorsCount[child]--;
        //        }
        //        topologicalSort.Add(node.Key);
        //        predecessorsCount.Remove(node.Key);
        //    }
        //    if (predecessorsCount.Count > 0)
        //    {
        //        Console.WriteLine("Invalid topological sorting");
        //    }
        //    else
        //    {
        //        Console.WriteLine($"Topological sorting: {string.Join(", ", topologicalSort)}");
        //    }
        //}
    }
}
