#!/bin/sh

__final() (
  :
)
__init() {
  set -eu
  trap __final EXIT
}
__init

# # #

main() (
  wasm-pack build --target web --dev --out-dir build/rust/pkg
  mkdir -p web/rust
  cp build/rust/pkg/rivium_bg.wasm web/rust
  cp build/rust/pkg/rivium.js web/rust
)

# # #

main "$@"
exit 0
