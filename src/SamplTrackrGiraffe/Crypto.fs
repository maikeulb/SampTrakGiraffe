module Tdl.Pathology.SampTracker.Crypto
open System
open System.Diagnostics.CodeAnalysis;
open System.Globalization
open System.IO
open System.IO.Compression
open System.Runtime.CompilerServices
open System.Security.Cryptography
open System.Text


let PBKDF2IterCount = 1000          // default for Rfc2898DeriveBytes
let PBKDF2SubkeyLength = 256 / 8    // 256 bits
let SaltSize = 128 / 8              // 128 bits

let VerifyHashedPassword (hashedPassword :string, password : string) =
    let hashedPasswordBytes = Convert.FromBase64String(hashedPassword)
    let salt = Array.create SaltSize 0uy
    Buffer.BlockCopy(hashedPasswordBytes, 1, salt, 0, SaltSize)
    let storedSubkey = Array.create PBKDF2SubkeyLength 0uy
    Buffer.BlockCopy(hashedPasswordBytes, 1 + SaltSize, storedSubkey, 0, PBKDF2SubkeyLength)
    use deriveBytes = new Rfc2898DeriveBytes(password, salt, PBKDF2IterCount)
    let generatedSubkey = deriveBytes.GetBytes(PBKDF2SubkeyLength)
    storedSubkey = generatedSubkey

let HashPassword password = 
    use deriveBytes = new Rfc2898DeriveBytes(password, SaltSize, PBKDF2IterCount)
    let salt = deriveBytes.Salt
    let subkey = deriveBytes.GetBytes(PBKDF2SubkeyLength)
    let outputBytes = Array.create (1 + SaltSize + PBKDF2SubkeyLength) 0uy
    Buffer.BlockCopy(salt, 0, outputBytes, 1, SaltSize)
    Buffer.BlockCopy(subkey, 0, outputBytes, 1 + SaltSize, PBKDF2SubkeyLength)
    Convert.ToBase64String(outputBytes)

