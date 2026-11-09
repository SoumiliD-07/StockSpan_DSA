#include <stdio.h>

#define MAX 1000

int main()
{
    int price[MAX];
    int span[MAX];
    int stack[MAX];

    int n, i;
    int top = -1;

    printf("=================================\n");
    printf("      STOCK SPAN VISUALIZER\n");
    printf("=================================\n");

    printf("Enter number of days: ");
    scanf("%d", &n);

    if (n <= 0 || n > MAX)
    {
        printf("Invalid number of days!\n");
        return 1;
    }

    printf("Enter stock prices:\n");

    for (i = 0; i < n; i++)
    {
        if (scanf("%d", &price[i]) != 1 || price[i] < 0)
        {
            printf("Invalid stock price!\n");
            return 1;
        }
    }

    // Calculate stock span
    for (i = 0; i < n; i++)
    {
        // Remove smaller or equal prices
        while (top >= 0 &&
               price[stack[top]] <= price[i])
        {
            top--;
        }

        // Calculate span
        if (top == -1)
        {
            span[i] = i + 1;
        }
        else
        {
            span[i] = i - stack[top];
        }

        // Push current index
        top++;
        stack[top] = i;
    }

    // Display text results
    printf("\n=================================\n");
    printf("          RESULT TABLE\n");
    printf("=================================\n");

    printf("Day\tPrice\tSpan\n");

    for (i = 0; i < n; i++)
    {
        printf("%d\t%d\t%d\n",
               i + 1, price[i], span[i]);
    }

    // Display graphical representation in terminal
    printf("\n========== SPAN GRAPH ==========\n");

    for (i = 0; i < n; i++)
    {
        printf("Day %d | ", i + 1);

        for (int j = 0; j < span[i]; j++)
        {
            printf("#");
        }

        printf(" (%d)\n", span[i]);
    }

    printf("\nTime Complexity: O(N)\n");
    printf("Space Complexity: O(N)\n");

    return 0;
}