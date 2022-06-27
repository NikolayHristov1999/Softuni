using System;
using System.Linq;

namespace Cinema
{
    internal class Program
    {
        private static string[] permutations;
        private static string[] namesLeft;
        private static bool[] taken;
        private static bool[] freeName;
        static void Main(string[] args)
        {
            var friendsNames = Console.ReadLine().Split(", ").ToList();
            permutations = new string[friendsNames.Count];
            taken = new bool[friendsNames.Count];
            var input = Console.ReadLine();

            while (input != "generate")
            {
                var parts = input.Split(" - ");
                var index = int.Parse(parts[1]) - 1;
                permutations[index] = parts[0];
                taken[index] = true;
                input = Console.ReadLine();
                friendsNames.Remove(parts[0]);
            }

            namesLeft = friendsNames.ToArray();
            freeName = new bool[friendsNames.Count];
            Permute(0);

        }

        static void Permute(int index)
        {
            if (index >= permutations.Length)
            {
                Console.WriteLine(String.Join(" ", permutations));
                return;
            }
            if (taken[index])
            {
                Permute(index + 1);
                return;
            }
            for (int i = 0; i < namesLeft.Length; i++)
            {
                if (freeName[i])
                {
                    continue;
                }
                permutations[index] = namesLeft[i];
                freeName[i] = true;
                Permute(index + 1);
                freeName[i] = false;

            }
        }
    }
}
