const MEMORY_SIZE: usize = 1024 * 1024 * 512;
const REGISTERS_COUNT: usize = 32 + 1;

const CODE_RANGE_BEGIN: usize = 0;
const CODE_RANGE_END: usize = CODE_RANGE_BEGIN + (1024 * 1024 * 32) - 1;

static mut MEMORY: [u8; MEMORY_SIZE] = [0; MEMORY_SIZE];
static mut REGISTERS: [u32; REGISTERS_COUNT] = [0; REGISTERS_COUNT];

const X0: usize = 0;
const X1: usize = 1;
const X2: usize = 2;
const X3: usize = 3;
const X4: usize = 4;
const X5: usize = 5;
const X6: usize = 6;
const X7: usize = 7;
const X8: usize = 8;
const X9: usize = 9;
const X10: usize = 10;
const X11: usize = 11;
const X12: usize = 12;
const X13: usize = 13;
const X14: usize = 14;
const X15: usize = 15;
const X16: usize = 16;
const X17: usize = 17;
const X18: usize = 18;
const X19: usize = 19;
const X20: usize = 20;
const X21: usize = 21;
const X22: usize = 22;
const X23: usize = 23;
const X24: usize = 24;
const X25: usize = 25;
const X26: usize = 26;
const X27: usize = 27;
const X28: usize = 28;
const X29: usize = 29;
const X30: usize = 30;
const X31: usize = 31;
const PC: usize = 32;

// # # #
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn set_panic_hook() {
  std::panic::set_hook(Box::new(console_error_panic_hook::hook))
}
// # # #

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn load_machine_code(byte: u8, address: usize) -> bool {
  if address > CODE_RANGE_END {
    false
  } else {
    unsafe {
      MEMORY[address] = byte
    }
    true
  }
}


#[wasm_bindgen::prelude::wasm_bindgen]
pub fn set_to_register(register: usize, value: u32) {
  if register == X0 {
    unsafe {
      REGISTERS[register] = 0
    }
  } else {
    unsafe {
      REGISTERS[register] = value
    }
  }
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn get_from_register(register: usize) -> u32 {
  if register == X0 {
    unsafe {
      REGISTERS[register] = 0;
      REGISTERS[register]
    }
  } else {
    unsafe {
      REGISTERS[register]
    }
  }
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn execute_instruction() -> bool {
  // fetch

  // decode
  // fail -> error

  // execute
  // debug signal -> do
  // check pc-register increment if branch
}
