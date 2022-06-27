using System;
using System.Diagnostics;
using System.Linq;

namespace QuickSort
{
    internal class Program
    {
        private const int MAX_LENGTH = 10_000_000;
        private static int[] testArr;
        private static Random rand;
        static void Main(string[] args)
        {
            //var arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            //QuickSort(arr, 0, arr.Length - 1);
            //Console.WriteLine(String.Join(" ", arr));
            testArr = new int[MAX_LENGTH];
            rand = new Random();
            for (int i = 0; i < MAX_LENGTH; i++)
            {
                testArr[i] = rand.Next(MAX_LENGTH);
            }
            var sw = new Stopwatch();
            sw.Start();
            MergeSortS(testArr);
            sw.Stop();
            Console.WriteLine(sw.ElapsedMilliseconds + " ms");
            sw.Restart();
            QuickSort(testArr, 0, testArr.Length - 1);
            sw.Stop();
            Console.WriteLine(sw.ElapsedMilliseconds + " ms");

        }

        private static int[] MergeSortS(int[] arr)
        {
            if (arr.Length <= 1)
            {
                return arr;
            }

            var copy = new int[arr.Length];
            Array.Copy(arr, copy, arr.Length);

            MergeSortHelper(arr, copy, 0, arr.Length - 1);

            return arr;
        }

        private static void MergeSortHelper(int[] source, int[] copy, int leftIndex, int rightIndex)
        {
            if (leftIndex >= rightIndex)
            {
                return;
            }
            var middleIndex = (leftIndex + rightIndex) / 2;
            MergeSortHelper(copy, source, leftIndex, middleIndex);
            MergeSortHelper(copy, source, middleIndex + 1, rightIndex);
            MergeArraysS(source, copy, leftIndex, middleIndex, rightIndex);
        }

        private static void MergeArraysS(int[] source, int[] copy, int startIndex, int middleIndex, int endIndex)
        {
            int srcIndex = startIndex;
            int leftIndex = startIndex;
            int rightIndex = middleIndex + 1;

            while (leftIndex <= middleIndex && rightIndex <= endIndex)
            {
                if (copy[leftIndex] <= copy[rightIndex])
                {
                    source[srcIndex] = copy[leftIndex];
                    leftIndex++;
                }
                else
                {
                    source[srcIndex] = copy[rightIndex];
                    rightIndex++;
                }
                srcIndex++;
            }
            while (leftIndex <= middleIndex)
            {
                source[srcIndex] = copy[leftIndex];
                leftIndex++;
                srcIndex++;
            }
            while (rightIndex <= endIndex)
            {
                source[srcIndex] = copy[rightIndex];
                rightIndex++;
                srcIndex++;
            }
        }

        private static void QuickSort(int[] arr, int startIndex, int endIndex)
        {
            if (startIndex >= endIndex)
            {
                return;
            }
            
            Swap(arr, startIndex, rand.Next(startIndex, endIndex + 1));
            int pivotIndex = startIndex;
            int leftIndex = startIndex + 1;
            int rightIndex = endIndex;

            while (leftIndex <= rightIndex)
            {
                if (arr[leftIndex] > arr[pivotIndex] && arr[rightIndex] < arr[pivotIndex])
                {
                    Swap(arr, leftIndex, rightIndex);
                }
                if (arr[pivotIndex] >= arr[leftIndex])
                {
                    leftIndex++;
                }
                if (arr[pivotIndex] <= arr[rightIndex])
                {
                    rightIndex--;
                }
            }
            if (arr[pivotIndex] > arr[rightIndex])
            {
                Swap(arr, pivotIndex, rightIndex);
            }
            var isLeftSubArraySmaller = rightIndex - 1 - startIndex < endIndex - (rightIndex - 1);
            if (isLeftSubArraySmaller)
            {
                QuickSort(arr, startIndex, rightIndex - 1);
                QuickSort(arr, rightIndex + 1, endIndex);
            }
            else
            {
                QuickSort(arr, rightIndex + 1, endIndex);
                QuickSort(arr, startIndex, rightIndex - 1);
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
