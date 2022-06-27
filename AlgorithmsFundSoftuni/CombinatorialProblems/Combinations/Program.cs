using System;
using System.Linq;

namespace Combinations
{
    internal class Program
    {
        private static char[] elements;
        private static char[] combinations;
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int k = int.Parse(Console.ReadLine());
            if (k == 0)
            {
                Console.WriteLine(0);
            }
            else
            {

                Console.WriteLine(Factorial(n) / (Factorial(k) * Factorial(n - k)));
            }
            //elements = Console.ReadLine().Split().Select(char.Parse).ToArray();
            //int n = int.Parse(Console.ReadLine());
            //combinations = new char[n];
            //CombinationsWithRepetition(0, 0);
        }
        static void CombinationsWithoutRepetition(int index, int start)
        {
            if (index >= combinations.Length)
            {
                Console.WriteLine(string.Join(" ", combinations));
            }
            else
            {
                for (int i = start; i < elements.Length; i++)
                {
                    combinations[index] = elements[i];
                    CombinationsWithoutRepetition(index + 1, i + 1);
                }
            }
        }
        static void CombinationsWithRepetition(int index, int start)
        {
            if (index >= combinations.Length)
            {
                Console.WriteLine(string.Join(" ", combinations));
            }
            else
            {
                for (int i = start; i < elements.Length; i++)
                {
                    combinations[index] = elements[i];
                    CombinationsWithRepetition(index + 1, i);
                }
            }
        }

        static long Factorial(int number)
        {
            if (number <= 1)
            {
                return 1;
            }
            return number * Factorial(number - 1);
        }
    }
}
