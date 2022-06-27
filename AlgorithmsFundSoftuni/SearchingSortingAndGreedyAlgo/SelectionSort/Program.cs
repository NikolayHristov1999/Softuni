using System;
using System.Linq;

namespace BasicSortingAlgo
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            InsertionSort(arr);
            Console.WriteLine(String.Join(" ", arr));
        }

        private static void BubbleSort(int[] arr)
        {
            for (int i = 0; i < arr.Length - 1; i++)
            {
                bool sorted = true;
                for (int j = 1; j < arr.Length - i; j++)
                {
                    if (arr[j - 1] > arr[j])
                    {
                        sorted = false;
                        Swap(arr, j, j - 1);
                    }
                }
                if (sorted)
                {
                    return;
                }
            }
        }

        private static void SelectionSort(int[] arr)
        {
            for (int i = 0; i < arr.Length - 1; i++)
            {
                int min = int.MaxValue;
                int minIndex = i;
                for (int j = i; j < arr.Length; j++)
                {
                    if (arr[j] < min)
                    {
                        min = arr[j];
                        minIndex = j;
                    }
                }
                Swap(arr, i, minIndex);
            }
        }

        private static void InsertionSort(int[] arr)
        {
            for (int i = 1; i < arr.Length; i++)
            {
                for (int j = i; j > 0 && arr[j] < arr[j - 1]; j--)
                {
                    Swap(arr, j, j - 1);
                }
            }
        }

        private static void Swap(int[] arr, int indexA, int indexB)
        {
            var tmp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = tmp;
        }
    }
}
