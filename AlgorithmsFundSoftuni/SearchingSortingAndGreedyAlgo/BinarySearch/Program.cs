using System;
using System.Linq;

namespace BinarySearch
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            var searched = int.Parse(Console.ReadLine());
            Console.WriteLine(BinarySearch(arr, searched));
        }

        static int BinarySearch(int[] arr, int searchedNumber)
        {
            int currentIndex = arr.Length / 2;
            int rightIndex = arr.Length - 1;
            int leftIndex = 0;
           
            while (rightIndex >= leftIndex)
            {
                if (arr[currentIndex] == searchedNumber)
                {
                    return currentIndex;
                }
                if (arr[currentIndex] > searchedNumber)
                {
                    rightIndex = currentIndex - 1;
                }
                else
                {
                    leftIndex = currentIndex + 1;
                }
                currentIndex = (leftIndex + rightIndex) / 2;
            }
            return -1;
        }
    }
}
