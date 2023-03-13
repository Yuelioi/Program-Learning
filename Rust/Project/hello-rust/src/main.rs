use std::fs;

fn main() {
    let content = fs::read_to_string("test.txt").expect("load failed");
    println!("{}", content);
}
