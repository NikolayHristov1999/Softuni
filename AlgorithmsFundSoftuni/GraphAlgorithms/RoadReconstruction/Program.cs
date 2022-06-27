using System;
using System.Collections.Generic;
using System.Linq;

namespace RoadReconstruction
{
    internal class Program
    {
        private static Dictionary<string, List<string>> graph;
        private static Dictionary<string, List<string>> predecessors;
        static void Main(string[] args)
        {
            var buildings = int.Parse(Console.ReadLine());
            var streets = int.Parse(Console.ReadLine());

            graph = new Dictionary<string, List<string>>();
            predecessors = new Dictionary<string,List<string>>();

            for (int i = 0; i < streets; i++)
            {
                var nodes = Console.ReadLine().Split(" - ");

                if (!predecessors.ContainsKey(nodes[0]))
                {
                    predecessors.Add(nodes[0], new List<string>());
                }
                predecessors[nodes[0]].Add(nodes[1]);

                if (!predecessors.ContainsKey(nodes[1]))
                {
                    predecessors.Add(nodes[1], new List<string>());
                }
                predecessors[nodes[1]].Add(nodes[0]);
            }
            Console.WriteLine("Important streets:");

            for (int i = 0; i < buildings; i++)
            {
                var node = predecessors.FirstOrDefault(x => x.Value.Count == 1);
                if (node.Value == null)
                {
                    break;
                }
                predecessors[node.Value.First()].Remove(node.Key);
                predecessors.Remove(node.Key);
                if (node.Key.CompareTo(node.Value.First()) < 0)
                {
                    Console.WriteLine(node.Key + " " + node.Value.First());
                    continue;
                }
                Console.WriteLine(node.Value.First() + " " + node.Key);
            }
        }
    }
}
