import * as web3 from "@solana/web3.js";
// Manually initialize variables that are automatically defined in Playground
const PROGRAM_ID = new web3.PublicKey("2xG9fSAwe69VpGTjYQmnN8Y7ym9bCZtU6uUAfb8pQJV6");
const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed");
const wallet = { keypair: web3.Keypair.generate() };

// Client code...
console.log(PROGRAM_ID.toString());

// Get latest blockhash info
const blockhashInfo = await connection.getLatestBlockhash();

// Create transaction
const tx = new web3.Transaction({
  ...blockhashInfo,
});

// Add our hello world program instruction
tx.add(
  new web3.TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [],
    data: Buffer.from([]),
  })
);

// Sign transaction
tx.sign(wallet.keypair);

// Send the transaction to the Solana cluster
const txHash = await connection.sendRawTransaction(tx.serialize());
console.log(txHash);