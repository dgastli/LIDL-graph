#include <stdbool.h>
#include <stdio.h>

typedef struct _void {
    bool activation;
} _Void,*Void;

typedef struct _boolean {
  bool activation;
  bool value;
} _Boolean,*Boolean;

typedef struct _number {
  bool activation;
  double value;
} _Number,*Number;

typedef struct _text {
  bool activation;
  char* value;
} _Text,*Text;

when(gt(x,0),output(30))



Void when(Void cond,Void effect) {
  effect->activation = cond->activation;

}

int main() {
  printf("OK");
  return 0;
}
