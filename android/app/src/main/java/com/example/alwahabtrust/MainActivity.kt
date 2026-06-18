package com.example.alwahabtrust

import android.os.Bundle
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        enableEdgeToEdge()
        setContent {
            var webViewRef by remember { mutableStateOf<WebView?>(null) }
            
            // Handle system back button to navigate backwards in WebView history
            BackHandler(enabled = webViewRef?.canGoBack() == true) {
                webViewRef?.goBack()
            }
            
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { context ->
                    WebView(context).apply {
                        layoutParams = ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT
                        )
                        // Settings configuration
                        settings.javaScriptEnabled = true
                        settings.allowFileAccess = true
                        settings.allowContentAccess = true
                        settings.domStorageEnabled = true // Persist local storage entries
                        settings.databaseEnabled = true
                        
                        webViewClient = object : WebViewClient() {
                            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                                return false // Let the WebView load the URL internally
                            }
                        }
                        
                        webViewRef = this
                        loadUrl("file:///android_asset/index.html")
                    }
                },
                update = {
                    // Do nothing on state updates
                }
            )
        }
    }
}

