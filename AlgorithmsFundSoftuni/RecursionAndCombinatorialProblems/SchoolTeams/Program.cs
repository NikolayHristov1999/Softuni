using System;
using System.Collections.Generic;
using System.Linq;

namespace SchoolTeams
{
    internal class Program
    {
        private static string[] combinations;
        private static List<string> girls;
        private static List<string> boys;

        static void Main(string[] args)
        {
            girls = Console.ReadLine().Split(", ").ToList();
            boys = Console.ReadLine().Split(", ").ToList();
            combinations = new string[5];
            FindCombinations(0, 0, 0);
        }

        private static void FindCombinations(int index, int startGirls, int startBoys)
        {
            if (index >= combinations.Length)
            {
                Console.WriteLine(String.Join(", ", combinations));
                return;
            }

            if (index < 3)
            {
                for (int i = startGirls; i < girls.Count; i++)
                {
                    combinations[index] = girls[i];
                    FindCombinations(index + 1, i + 1, startBoys);
                }
            }
            else
            {
                for (int i = startBoys; i < boys.Count; i++)
                {
                    combinations[index] = boys[i];
                    FindCombinations(index + 1, startGirls, i + 1);
                }
            }
        }
    }
}
