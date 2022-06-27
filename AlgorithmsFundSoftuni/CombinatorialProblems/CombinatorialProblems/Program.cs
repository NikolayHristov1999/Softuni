using System;
using System.Collections.Generic;
using System.Linq;

namespace CombinatorialProblems
{
    internal class Program
    {
        private static char[] permutations;
        private static bool[] used;
        private static char[] arr;
        private static HashSet<string> set;
        static void Main(string[] args)
        {
            arr = Console.ReadLine().Split().Select(char.Parse).ToArray();
            permutations = new char[arr.Length];
            used = new bool[arr.Length];
            set = new HashSet<string>();

            //PermutationsWithoutRepetitions(0);
            PermutationsWithRepetitions(0);
        }

        static void PermutationsWithoutRepetitions(int index)
        {
            if (index >= permutations.Length)
            {
                string perm = string.Join(" ", permutations);
                if (set.Contains(perm))
                {
                    return;
                }
                set.Add(perm.ToString());
                Console.WriteLine(perm);
            }
            else
            {
                for (int i = 0; i < permutations.Length; i++)
                {
                    if (used[i] == false)
                    {
                        permutations[index] = arr[i];
                        used[i] = true;
                        PermutationsWithoutRepetitions(index + 1);
                        used[i] = false;
                    }
                }

            }
        }

        static void PermutationsWithRepetitions(int index)
        {
            if (index >= arr.Length)
            {
                Console.WriteLine(string.Join(" ", arr));
            }
            else
            {
                PermutationsWithRepetitions(index + 1);
                var swapped = new HashSet<char> { arr[index] };
                for (int i = index + 1; i < arr.Length; i++)
                {
                    if (!swapped.Contains(arr[i]))
                    {
                        Swap(index, i, arr);
                        PermutationsWithRepetitions(index + 1);
                        Swap(index, i, arr);
                        swapped.Add(arr[i]);
                    }
                }

            }
        }

        static void Swap(int indexA, int indexB, char[] array)
        {
            var tmp = array[indexA];
            array[indexA] = array[indexB];
            array[indexB] = tmp;
        }
    }
}
