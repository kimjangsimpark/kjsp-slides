<script lang="ts">
  let name: string;
  let email: string;
  let password: string;

  $: disablesSubmitButton = !(name && email && password);
</script>

<main>
  <form>
    <h2>Sign up with <b>Email</b></h2>
    <div>
      <input type="text" name="name" id="name" placeholder=" " bind:value={name} />
      <label for="name">Username</label>
    </div>
    <div>
      <input type="email" name="email" id="email" placeholder=" " bind:value={email} />
      <label for="name">Email</label>
    </div>
    <div>
      <input
        type="password"
        name="password"
        id="password"
        placeholder=" "
        bind:value={password}
      />
      <label for="name">Password</label>
    </div>
    <button disabled={disablesSubmitButton}>Sign up</button>
  </form>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    padding: 20px;

    form {
      width: 400px;
      padding: {
        left: 20px;
        top: 30px;
        right: 20px;
        bottom: 30px;
      }
      border: 1px solid $gray-line-3;
      border-radius: 2px;

      h2 {
        margin-bottom: 40px;
        font: {
          size: 18px;
          weight: 300;
        }

        b {
          font-weight: 500;
        }
      }

      div {
        position: relative;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        label {
          position: absolute;
          top: 0;
          left: 0;
          padding: 14px;
          color: $gray-line-3;
          pointer-events: none;
          transition-property: font-size, transform;
          transition-duration: 0.1s;
          transition-timing-function: ease-in-out;
        }

        input {
          width: 100%;
          padding: 14px 12px;
          border: 1px solid $gray-line-3;
          border-radius: 1px;

          &:focus {
            outline: 1px auto $primary-color;
          }

          &:not(:placeholder-shown) {
            padding: {
              top: 20px;
              bottom: 8px;
            }

            & + label {
              font-size: 11px;
              transform: translate(-3px, -9px);
            }
          }
        }
      }

      button {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 1px;
        color: #ffffff;
        background-color: $primary-color;

        &:hover {
          background-color: $primary-color-3;
        }

        &:focus {
          outline: 1px auto $primary-color;
        }

        &:disabled {
          cursor: not-allowed;
          background-color: rgb(165, 165, 165);
        }
      }
    }
  }
</style>
