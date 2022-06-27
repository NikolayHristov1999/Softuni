using System;
using System.Linq;

namespace MergeSort
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            var sorted = MergeSort(arr);
            Console.WriteLine(String.Join(" ", sorted));
        }
        //Memory: O(n*log(n))
        private static int[] MergeSort(int[] arr)
        {
            if (arr.Length <= 1)
            {
                return arr;
            }

            var middleIndex = arr.Length / 2;
            var leftArr = arr.Take(middleIndex).ToArray();
            var rightArr = arr.Skip(middleIndex).ToArray();

            return MergeArrays(MergeSort(leftArr), MergeSort(rightArr));
        }

        private static int[] MergeArrays(int[] leftArr, int[] rightArr)
        {
            int[] arr = new int[leftArr.Length + rightArr.Length];
            int leftArrIndex = 0;
            int rightArrIndex = 0;
            int index = 0;
            while (index < arr.Length 
                && leftArrIndex < leftArr.Length 
                && rightArrIndex < rightArr.Length)
            {
                if (leftArr[leftArrIndex] <= rightArr[rightArrIndex])
                {
                    arr[index] = leftArr[leftArrIndex];
                    leftArrIndex++;
                }
                else
                {
                    arr[index] = rightArr[rightArrIndex];
                    rightArrIndex++;
                }
                index++;
            }
            while (leftArrIndex < leftArr.Length)
            {
                arr[index] = leftArr[leftArrIndex];
                leftArrIndex++;
                index++;
            }
            while (rightArrIndex < rightArr.Length)
            {
                arr[index] = rightArr[rightArrIndex];
                rightArrIndex++;
                index++;
            }

            return arr;
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
    }
}
