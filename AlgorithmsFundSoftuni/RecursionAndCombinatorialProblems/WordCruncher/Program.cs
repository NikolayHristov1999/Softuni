using System;
using System.Collections.Generic;
using System.Linq;

namespace WordCruncher
{
    internal class Program
    {
        private static string text;
        private static string[] stringParts;
        private static bool[] used;
        private static List<string> variations;
        private static HashSet<string> answersSet;
        static void Main(string[] args)
        {
            stringParts = Console.ReadLine().Split(", ").OrderBy(x => x.Length).ToArray();
            text = Console.ReadLine();

            used = new bool[stringParts.Length];
            variations = new List<string>();
            answersSet = new HashSet<string>();

            FindVariations(0);
        }


        private static void FindVariations(int firstSearchedIndex)
        {
            if (firstSearchedIndex >= text.Length)
            {
                var answer = string.Join(" ", variations);
                if (!answersSet.Contains(answer))
                {
                    Console.WriteLine(answer);
                    answersSet.Add(answer);
                }
                return;
            }

            string substring = text.Substring(firstSearchedIndex);
            for (int i = 0; i < stringParts.Length; i++)
            {
                if (!used[i] && stringParts[i].Length <= substring.Length)
                {
                    if (substring.StartsWith(stringParts[i]))
                    {
                        used[i] = true;
                        variations.Add(stringParts[i]);
                        FindVariations(firstSearchedIndex + stringParts[i].Length);
                        used[i] = false;
                        variations.RemoveAt(variations.Count - 1);
                    }
                }
            }
        }
    }
}
