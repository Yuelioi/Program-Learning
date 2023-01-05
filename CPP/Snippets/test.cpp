#include <stdio.h>
#include <time.h>

clock_t start, stop;
double duration;

void myFunction() {
  int sum;
  for (int val = 0; val <= 100000000; ++val) {
    sum += val;
  }
}

int main() {
  start = clock();
  myFunction();
  stop = clock();
  duration = ((double)(stop - start)) / CLK_TCK;
  printf("%lf", duration);
}