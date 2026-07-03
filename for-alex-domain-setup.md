# Getting your site live: a 15-minute walkthrough

Hey Alex! Here's everything you need to do on your end to get the site live on your own domain. Total time: about 15 minutes. Total cost: ~$11 for the year, paid to one place (Porkbun), in your name, on your card.

I'll handle the rest from there.

---

## Step 0: Pick your domain name (do this first)

You mentioned **elephantes.com**. Worth a quick gut check before you buy, because the domain is what people will type for the next ten years.

Three options on the table:

| Domain | Pros | Cons |
|---|---|---|
| **elephantaes.com** | Matches your brand and your Instagram exactly. No "wait how do you spell it" moments. | One letter longer. |
| **elephantes.com** | Shorter, easier to say. | Doesn't match `@elephantaes.cakes`. People will type it wrong half the time. |
| **elephantaescakes.com** | Crystal clear. Hard to mistype. | Longer to type. |

My honest take: **elephantaes.com** if it's available. It matches the brand, IG, and everything we've already printed. But you know your customers better than I do, so pick what feels right.

Whichever you pick, I'd grab the `.com`. Skip the `.shop` / `.bakery` / `.online` upsells. Just `.com`.

---

## Step 1: Buy the domain on Porkbun

1. Go to **porkbun.com**
2. Top-right, click **Sign Up** (use your real email; this is the account that owns the domain forever)
3. Once logged in, type your domain in the big search bar on the homepage
4. If it's available, you'll see a price (~$11/yr for a `.com`)
5. Click **Add to Cart**, then **Checkout**
6. **At checkout, watch for these:**
   - ✅ **WHOIS Privacy** should be **on** (it's free at Porkbun, hides your home address from public lookup)
   - ❌ Skip the email hosting upsell ($24/yr, you don't need it; we'll use a free option)
   - ❌ Skip the website builder upsell (we already built your site)
   - ❌ Skip SSL certificate (free with how we're hosting)
7. Pay. You'll get a confirmation email.

That's it for buying.

---

## Step 2: Tell me you bought it

Just text or email me the domain you ended up with. **You do not need to send me your Porkbun login.**

I'll send you back two short DNS records to paste into Porkbun. Those records are what point your domain at the website. Takes you 2 minutes.

---

## Step 3: Paste in the DNS records I send you

When you get my message:

1. Log into Porkbun
2. Click **Account** → **Domain Management**
3. Find your domain in the list, click **Details**
4. Scroll to **DNS Records**
5. Delete any default records that are already there (parking page stuff)
6. Add the two records I send you (I'll give you exact copy/paste values)
7. Click **Save**

Within an hour (sometimes within 5 minutes), your site is live at your domain. I'll confirm it's working and send you the link.

---

## What this is going to cost you, ongoing

| Thing | Cost | Why |
|---|---|---|
| Domain | ~$11/yr | Porkbun, paid yearly. Set a calendar reminder to renew, or turn on auto-renew at checkout. |
| Hosting | $0 | Netlify's free tier handles way more traffic than you'll get. |
| SSL (the little padlock) | $0 | Comes free with hosting. |
| **Total** | **~$11/yr** | About $1/mo, basically. |

Square fees are separate (2.9% + 30¢ per online order, same as everywhere else).

---

## Stuff to keep somewhere safe

After you buy:

- **Porkbun login** (your email + password). This is the keys to the kingdom. If you lose this, you lose the domain. I recommend writing it in a password manager (1Password, Bitwarden, even the iPhone built-in one is fine).
- **The renewal date** for the domain. Porkbun emails you, but a calendar reminder is good backup.

---

## Things people will ask me that I want you to know the answer to

**"Wait, why isn't the domain in Ryan's name?"**
Because it's your business. The domain should always be in the owner's name, not the developer's. If we ever stop working together, you keep everything with zero handoff drama.

**"Can I get email at @elephantaes.com later?"**
Yes, easily, when you want it. Google Workspace is $6/user/mo, or Porkbun's own email is $24/yr. Not urgent.

**"What if I want to move off Netlify someday?"**
You change those two DNS records to point somewhere else. Domain stays yours. Site files are yours. No lock-in anywhere.

---

That's the whole thing. Let me know when you've grabbed the domain and we'll get you live.
