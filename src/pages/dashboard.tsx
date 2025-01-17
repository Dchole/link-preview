import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import AddLink from "@/components/AddLink";
import Router from "next/router";
import useUser from "@/hooks/useUser";
import Cards from "@/components/Cards";
import Head from "next/head";
const dashboard = () => {
  const { isAuthenticated, authenticating } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // if we're done loading and user isn't authenticated
      Router.replace("/login");
    }
  }, [isAuthenticated, authenticating]); // add authenticating to dependencies
  return (
    <Layout>
      <Head>
        <title>Preview your links</title>
      </Head>
      <div className={styles.wrapper}>
        <AddLink />
        <Cards />
      </div>
    </Layout>
  );
};

export default dashboard;
