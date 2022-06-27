using System;
using System.Collections.Generic;
using System.Linq;

namespace SumOfCoins
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var coins = Console.ReadLine().Split(", ")
                .Select(int.Parse)
                .OrderByDescending(x => x)
                .ToList();
            var value = int.Parse(Console.ReadLine());
            var valueLeft = value;
            var coinsCounter = new int[coins.Count];
            var totalCoinsUsed = 0;

            for (int i = 0; i < coins.Count && valueLeft > 0; i++)
            {
                int coinAmount = valueLeft / coins[i];
                coinsCounter[i] = 0;
                if (coinAmount > 0)
                {
                    coinsCounter[i] = coinAmount;
                    valueLeft = valueLeft % coins[i];
                    totalCoinsUsed += coinAmount;
                }
            }
            if (valueLeft != 0)
            {
                Console.WriteLine("Error");
                return;
            }
            Console.WriteLine($"Number of coins to take: {totalCoinsUsed}");
            for (int i = 0; i < coinsCounter.Length; i++)
            {
                if (coinsCounter[i] > 0)
                {
                    Console.WriteLine($"{coinsCounter[i]} coin(s) with value {coins[i]}");
                }
            }
        }
    }
}
