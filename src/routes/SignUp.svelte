<script lang="ts">
  import AccountForm from '@/components/AccountForm.svelte';
  import { signUp } from '@/http/auth';
  import { catchError, throwError } from 'rxjs';
  import { push } from 'svelte-spa-router';

  let userName: string;
  let userEmail: string;
  let userPassword: string;
  let userPhone: string;

  userName = '테스트 네임';
  userEmail = '@test.com';
  userPassword = '1234qwer';
  userPhone = '0112221111';

  const hadleFormSubmit = (): void => {
    signUp({
      userName,
      userEmail,
      userPassword,
      userPhone,
    })
      .pipe(
        catchError(error => {
          if (error instanceof Response) {
            if (error.status === 400) {
              alert('이미 가입된 이메일입니다.');
            } else if (error.status === 500) {
              alert('통신 오류입니다. 잠시 후 다시 시도하세요.');
            }
          } else {
            // console.error(error);
            alert('뭔가 잘못됨');
          }

          return throwError(() => error);
        }),
      )
      .subscribe({
        next: () => {
          alert('회원가입이 완료되었습니다.');
          push('/home/sign-in');
        },
      });
  };

  $: disablesSubmitButton = !(userName && userEmail && userPassword && userPhone);
</script>

<main>
  <AccountForm {hadleFormSubmit} isSignin={false}>
    <h2 slot="formTitle">Sign up with <b>Email</b></h2>
    <input
      slot="userName"
      type="text"
      name="userName"
      id="userName"
      placeholder=" "
      bind:value={userName}
    />
    <input
      slot="userEmail"
      type="email"
      name="userEmail"
      id="userEmail"
      placeholder=" "
      bind:value={userEmail}
    />
    <input
      slot="userPassword"
      type="password"
      name="userPassword"
      id="userPassword"
      placeholder=" "
      bind:value={userPassword}
    />
    <input
      slot="userPhone"
      type="tel"
      name="userPhone"
      id="userPhone"
      placeholder=" "
      bind:value={userPhone}
    />
    <button slot="submitButton" disabled={disablesSubmitButton}>Sign up</button>
  </AccountForm>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    padding: 20px;
  }
</style>
