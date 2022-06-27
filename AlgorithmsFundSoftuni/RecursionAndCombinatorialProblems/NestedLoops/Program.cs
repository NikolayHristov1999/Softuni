using System;

namespace NestedLoops
{
    internal class Program
    {
        private static int[] permutations;
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            permutations = new int[n];
            GenVectors(0);
        }

        static void GenVectors(int index)
        {
            if (index >= permutations.Length)
            {
                Console.WriteLine(string.Join(" ", permutations));
                return;
            }

            for (int i = 0; i < permutations.Length; i++)
            {
                permutations[index] = i + 1;
                GenVectors(index + 1);
            }

        }
    }
}
