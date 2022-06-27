using System;
using System.Linq;

namespace Variations
{
    internal class Program
    {
        private static char[] elements;
        private static int slots;
        private static bool[] used;
        private static char[] variation;

        static void Main(string[] args)
        {
            elements = Console.ReadLine().Split().Select(char.Parse).ToArray();
            slots = int.Parse(Console.ReadLine());
            variation = new char[slots];
            used = new bool[elements.Length];
            //VariationsWithoutRepetitions(0);
            VariationsWithRepetitions(0);
        }

        static void VariationsWithoutRepetitions(int index)
        {
            if (index >= slots)
            {
                Console.WriteLine(string.Join(" ", variation));
                return;
            }
            for (int i = 0; i < elements.Length; i++)
            {
                if (!used[i])
                {
                    used[i] = true;
                    variation[index] = elements[i];
                    VariationsWithoutRepetitions(index + 1);
                    used[i] = false;
                }

            }
        }

        static void VariationsWithRepetitions(int index)
        {
            if (index >= slots)
            {
                Console.WriteLine(string.Join(" ", variation));
                return;
            }
            for (int i = 0; i < elements.Length; i++)
            {
                variation[index] = elements[i];
                VariationsWithRepetitions(index + 1);

            }
        }
    }
}
