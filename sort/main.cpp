#include<iostream>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int in[], int a, int b) { 
    
    int p = in[b];
    int i = (a - 1);

    for(int j = a; j <= b - 1; j++) {
        if(in[j] <= p) {
            i++;
            swap(&in[i], &in[j]);
        }
    }
    swap(&in[i+1], &in[b]);
    return (i + 1);
}

void quicksort(int in[], int a, int b) {
    if(a < b) {

        int p = partition(in, a, b);

        quicksort(in, a, p - 1);
        quicksort(in, p + 1, b);
    }
}

void printStuff(int in[], int n) {
    for(int i = 0; i < n; i++) {
        std::cout << in[i] << std::endl;
    }
}

int main() {
    int arr[] = {1, 10, 2, 6, 5, 3, 12, 15};
    int n = sizeof(arr)/sizeof(arr[0]);
    quicksort(arr, 0, n-1);
    std::cout << (arr[n-1]*arr[n-2]*arr[n-3]) << std::endl;
}
