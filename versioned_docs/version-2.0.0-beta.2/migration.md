---
id: migration
title: Migration Guide  
sidebar_label: Migration Guide
sidebar_position: 6
description: Migrate from SimpleEnvs Beta.1 to Beta.2 with enhanced async support
keywords: [simpleenvs, migration, beta.1, beta.2, async, upgrade]
---

# Migration Guide: Stable 1.1.4, <br/>Beta.1 → Beta.2

Complete guide for upgrading from SimpleEnvs v2.0.0-beta.1 to v2.0.0-beta.2 with enhanced async support! 🚀

## 🎯 Migration Overview

**Good News: 100% Backward Compatible!** ✅

- ✅ **Zero Breaking Changes** - All beta.1 code works unchanged
- 🆕 **New Async Features** - Enhanced async capabilities
- 🔄 **Improved Implementation** - Better internal consistency
- ⚡ **Performance Gains** - Optimized async patterns

## 📋 What's New in Beta.2

### 🆕 New Functions

```python
# New dedicated async secure functions
await simpleenvs.load_secure_async()        # Internal async API
await simpleenvs.load_dotenv_secure_async() # Public async one-liner
```

### 🔄 Enhanced Functions  

```python
# Improved implementation (same interface)
await simpleenvs.aload_dotenv()  # Now uses load() internally
```

### 📦 Updated Exports

```python
# New __all__ exports in beta.2
"load_secure_async",           # 🆕 Internal async secure API
"load_dotenv_secure_async",    # 🆕 Public async secure one-liner
```

---

## 🚀 Quick Migration Checklist

### ✅ Instant Compatibility Check

**Your existing beta.1 code works without changes:**

```python
# ✅ Beta.1 code - works in beta.2 unchanged
await simpleenvs.load_secure()
await simpleenvs.aload_dotenv()
simpleenvs.load_dotenv_secure()
```

### 🔄 Optional Upgrades (Recommended)

**Take advantage of new beta.2 features:**

```python
# 🆕 Beta.2 - new async secure loading
await simpleenvs.load_dotenv_secure_async()  # NEW!

# 🔄 Beta.2 - improved async implementation  
await simpleenvs.aload_dotenv()  # Better internal consistency
```

---

## 📖 Migration Scenarios

### Scenario 1: Simple Web Application

#### Before (Beta.1)
```python
# main.py - Beta.1 approach
import simpleenvs
from fastapi import FastAPI

app = FastAPI()

@app.on_event("startup")
async def startup():
    # Load public config
    await simpleenvs.aload_dotenv()
    
    # Load secrets (sync only in beta.1)
    simpleenvs.load_dotenv_secure()  # Sync loading

@app.get("/")
def read_root():
    return {
        "app": simpleenvs.get_str("APP_NAME"),
        "has_secrets": simpleenvs.get_secure("JWT_SECRET") is not None
    }
```

#### After (Beta.2) - Enhanced ✨
```python
# main.py - Beta.2 approach
import simpleenvs
from fastapi import FastAPI

app = FastAPI()

@app.on_event("startup")
async def startup():
    # Load public config (improved implementation)
    await simpleenvs.aload_dotenv()  # 🔄 Better internal consistency
    
    # Load secrets (NEW async support!)
    await simpleenvs.load_dotenv_secure_async()  # 🆕 Fully async!

@app.get("/")
def read_root():
    return {
        "app": simpleenvs.get_str("APP_NAME"),
        "has_secrets": simpleenvs.get_secure("JWT_SECRET") is not None
    }
```

**Benefits:**
- ⚡ Fully async startup - no blocking calls
- 🔒 Same security guarantees
- 📈 Better performance under load

### Scenario 2: Microservice Configuration

#### Before (Beta.1)
```python
# config.py - Beta.1 approach
import os
import simpleenvs

class Config:
    def __init__(self):
        # Environment detection
        env = os.getenv('ENVIRONMENT', 'development')
        
        if env == 'production':
            # Mixed sync/async (inconsistent)
            simpleenvs.load_dotenv_secure()  # Sync
        else:
            asyncio.run(simpleenvs.aload_dotenv())  # Async
        
        self._load_settings()
    
    def _load_settings(self):
        self.app_name = simpleenvs.get_str('APP_NAME', 'MyApp')
        self.jwt_secret = simpleenvs.get_secure('JWT_SECRET')

# Usage
config = Config()  # Sync initialization
```

#### After (Beta.2) - Consistent ✨
```python
# config.py - Beta.2 approach
import os
import simpleenvs

class AsyncConfig:
    def __init__(self):
        self.loaded = False
    
    async def initialize(self):
        """Async initialization for consistency"""
        env = os.getenv('ENVIRONMENT', 'development')
        
        if env == 'production':
            # Full async consistency!
            await simpleenvs.load_dotenv_secure_async()  # 🆕 Async secure
        else:
            await simpleenvs.aload_dotenv()  # 🔄 Improved implementation
        
        await self._load_settings()
        self.loaded = True
        return self
    
    async def _load_settings(self):
        """Async settings loading"""
        self.app_name = simpleenvs.get_str('APP_NAME', 'MyApp')
        self.jwt_secret = simpleenvs.get_secure('JWT_SECRET')

# Usage
config = await AsyncConfig().initialize()  # 🚀 Fully async!
```

**Benefits:**
- 🔄 Consistent async patterns throughout
- 🎯 Better error handling
- 🚀 Non-blocking initialization

### Scenario 3: Multi-Environment Setup

#### Before (Beta.1)
```python
# environment_loader.py - Beta.1 approach
import simpleenvs

async def load_environment_config():
    """Load configuration based on environment"""
    import os
    env = os.getenv('ENVIRONMENT', 'development')
    
    # Inconsistent sync/async patterns
    if env == 'production':
        await simpleenvs.aload_dotenv('.env.production')
        simpleenvs.load_dotenv_secure('.env.secrets')  # Sync
    elif env == 'staging':
        await simpleenvs.aload_dotenv('.env.staging')
        simpleenvs.load_dotenv_secure('.env.secrets')  # Sync
    else:
        await simpleenvs.aload_dotenv('.env.development')
    
    return env

# Usage
env = await load_environment_config()
```

#### After (Beta.2) - Unified ✨
```python
# environment_loader.py - Beta.2 approach
import simpleenvs

async def load_environment_config():
    """Load configuration with consistent async patterns"""
    import os
    env = os.getenv('ENVIRONMENT', 'development')
    
    # Consistent async patterns throughout!
    if env == 'production':
        await simpleenvs.aload_dotenv('.env.production')
        await simpleenvs.load_dotenv_secure_async('.env.secrets')  # 🆕 Async!
    elif env == 'staging':
        await simpleenvs.aload_dotenv('.env.staging')
        await simpleenvs.load_dotenv_secure_async('.env.secrets')  # 🆕 Async!
    else:
        await simpleenvs.aload_dotenv('.env.development')
    
    return env

# Enhanced usage with error handling
async def safe_environment_loading():
    """Production-ready environment loading"""
    try:
        env = await load_environment_config()
        
        # Validate required variables
        required_vars = ['DATABASE_URL', 'JWT_SECRET', 'API_KEY']
        missing = []
        
        for var in required_vars:
            if not simpleenvs.get_secure(var):
                missing.append(var)
        
        if missing:
            raise ValueError(f"Missing required variables: {missing}")
        
        return env
        
    except Exception as e:
        print(f"❌ Environment loading failed: {e}")
        raise

# Usage
env = await safe_environment_loading()
```

**Benefits:**
- 🎯 Unified async patterns
- 🔒 Consistent security approach
- 🛡️ Better error handling

---

## 🔄 Function Migration Map

### Loading Functions

| Beta.1 Function | Beta.2 Equivalent | Status | Notes |
|----------------|-------------------|---------|-------|
| `load_dotenv()` | `load_dotenv()` | ✅ Unchanged | Same API |
| `aload_dotenv()` | `aload_dotenv()` | 🔄 Improved | Better implementation |
| `load_dotenv_secure()` | `load_dotenv_secure()` | ✅ Unchanged | Same API |
| N/A | `load_dotenv_secure_async()` | 🆕 **NEW** | Async secure one-liner |
| N/A | `load_secure_async()` | 🆕 **NEW** | Internal async API |

### Access Functions

| Beta.1 Function | Beta.2 Equivalent | Status | Notes |
|----------------|-------------------|---------|-------|
| `get_secure()` | `get_secure()` | ✅ Unchanged | Same API |
| `get_str_secure()` | `get_str_secure()` | ✅ Unchanged | Same API |
| `is_loaded_secure()` | `is_loaded_secure()` | ✅ Unchanged | Same API |

---

## 🎯 Migration Strategies

### Strategy 1: Conservative (Zero Risk)

**Keep all existing code unchanged:**

```python
# ✅ Your beta.1 code works perfectly in beta.2
await simpleenvs.load_secure()
await simpleenvs.aload_dotenv()
simpleenvs.load_dotenv_secure()

# No changes needed!
```

**When to use:**
- Production systems requiring zero risk
- Large codebases with extensive testing
- Time-sensitive deployments

### Strategy 2: Gradual Enhancement  

**Incrementally adopt new features:**

```python
# Phase 1: Update public config loading
await simpleenvs.aload_dotenv()  # 🔄 Improved implementation

# Phase 2: Add new async secure loading
await simpleenvs.load_dotenv_secure_async()  # 🆕 NEW feature

# Phase 3: Optimize patterns based on usage
```

**When to use:**
- Active development projects
- Want to leverage new features
- Can test incrementally

### Strategy 3: Complete Modernization

**Adopt all beta.2 patterns:**

```python
# Full async consistency
async def modern_app_startup():
    """Modern beta.2 startup pattern"""
    # Load public configuration
    await simpleenvs.aload_dotenv()
    
    # Load secrets asynchronously
    await simpleenvs.load_dotenv_secure_async()
    
    # Validate and return status
    return {
        "config_loaded": simpleenvs.is_loaded(),
        "secrets_loaded": simpleenvs.is_loaded_secure()
    }

# Usage
status = await modern_app_startup()
```

**When to use:**
- New projects
- Major refactoring opportunities
- Want maximum async benefits

---

## 🔧 Common Migration Patterns

### Pattern 1: FastAPI Application

#### Before (Beta.1)
```python
from fastapi import FastAPI
import simpleenvs

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await simpleenvs.aload_dotenv()
    simpleenvs.load_dotenv_secure()  # Sync blocking call
```

#### After (Beta.2)
```python
from fastapi import FastAPI
import simpleenvs

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await simpleenvs.aload_dotenv()
    await simpleenvs.load_dotenv_secure_async()  # 🆕 Non-blocking!
```

### Pattern 2: Environment-Specific Configuration

#### Before (Beta.1)
```python
import os

env = os.getenv('ENVIRONMENT', 'development')

if env == 'production':
    simpleenvs.load_dotenv_secure('.env.production')  # Sync
else:
    await simpleenvs.aload_dotenv('.env.development')  # Async - inconsistent!
```

#### After (Beta.2)
```python
import os

env = os.getenv('ENVIRONMENT', 'development')

if env == 'production':
    await simpleenvs.load_dotenv_secure_async('.env.production')  # 🆕 Async!
else:
    await simpleenvs.aload_dotenv('.env.development')  # Consistent async
```

### Pattern 3: Configuration Classes

#### Before (Beta.1)
```python
class Config:
    def __init__(self):
        # Mixed sync/async initialization
        simpleenvs.load_dotenv_secure()  # Sync
        
    async def load_additional_config(self):
        await simpleenvs.aload_dotenv('.env.additional')
```

#### After (Beta.2)
```python
class AsyncConfig:
    async def initialize(self):
        # Consistent async initialization
        await simpleenvs.load_dotenv_secure_async()  # 🆕 Async
        await simpleenvs.aload_dotenv('.env.additional')
        return self

# Usage
config = await AsyncConfig().initialize()
```

---

## 🚨 Migration Gotchas & Solutions

### Gotcha 1: Mixing Sync and Async

#### ❌ Problematic Pattern
```python
# Inconsistent sync/async mixing
async def startup():
    await simpleenvs.aload_dotenv()
    simpleenvs.load_dotenv_secure()  # Sync call in async context
```

#### ✅ Solution
```python
# Consistent async pattern
async def startup():
    await simpleenvs.aload_dotenv()
    await simpleenvs.load_dotenv_secure_async()  # 🆕 Async!
```

### Gotcha 2: Initialization Order

#### ❌ Problematic Pattern
```python
# Accessing before loading
secret = simpleenvs.get_secure('JWT_SECRET')  # May be None
await simpleenvs.load_dotenv_secure_async()
```

#### ✅ Solution
```python
# Load first, then access
await simpleenvs.load_dotenv_secure_async()
secret = simpleenvs.get_secure('JWT_SECRET')  # Properly loaded
```

### Gotcha 3: Error Handling

#### ❌ Problematic Pattern
```python
# No error handling
await simpleenvs.load_dotenv_secure_async()
```

#### ✅ Solution
```python
# Proper error handling
try:
    await simpleenvs.load_dotenv_secure_async()
except simpleenvs.SimpleEnvsError as e:
    print(f"Configuration error: {e}")
    raise
```

---

## 🧪 Testing Your Migration

### Test 1: Basic Functionality

```python
# test_migration.py
import asyncio
import simpleenvs

async def test_beta2_migration():
    """Test basic beta.2 functionality"""
    
    # Create test .env file
    with open('.env.test', 'w') as f:
        f.write('TEST_VAR=hello\nSECRET_KEY=secret123\n')
    
    try:
        # Test new async secure loading
        await simpleenvs.load_dotenv_secure_async('.env.test')
        
        # Verify access
        assert simpleenvs.get_secure('SECRET_KEY') == 'secret123'
        assert simpleenvs.is_loaded_secure()
        
        print("✅ Beta.2 migration test passed!")
        
    finally:
        # Cleanup
        import os
        os.unlink('.env.test')
        simpleenvs.clear()

# Run test
asyncio.run(test_beta2_migration())
```

### Test 2: Performance Comparison

```python
# benchmark_migration.py
import time
import asyncio
import simpleenvs

async def benchmark_migration():
    """Compare beta.1 vs beta.2 patterns"""
    
    # Create test file
    with open('.env.benchmark', 'w') as f:
        for i in range(100):
            f.write(f'VAR_{i}=value_{i}\n')
    
    try:
        # Beta.1 pattern (mixed sync/async)
        start = time.perf_counter()
        await simpleenvs.aload_dotenv('.env.benchmark')
        simpleenvs.load_dotenv_secure('.env.benchmark')  # Sync
        beta1_time = time.perf_counter() - start
        
        simpleenvs.clear()
        
        # Beta.2 pattern (full async)
        start = time.perf_counter()
        await simpleenvs.aload_dotenv('.env.benchmark')
        await simpleenvs.load_dotenv_secure_async('.env.benchmark')  # 🆕 Async
        beta2_time = time.perf_counter() - start
        
        print(f"Beta.1 pattern: {beta1_time:.4f}s")
        print(f"Beta.2 pattern: {beta2_time:.4f}s")
        print(f"Improvement: {((beta1_time - beta2_time) / beta1_time * 100):.1f}%")
        
    finally:
        import os
        os.unlink('.env.benchmark')
        simpleenvs.clear()

# Run benchmark
asyncio.run(benchmark_migration())
```

---

## 📈 Performance Benefits

### Async Consistency Benefits

```python
# Beta.1: Mixed sync/async (potential blocking)
async def beta1_pattern():
    await simpleenvs.aload_dotenv()        # Async
    simpleenvs.load_dotenv_secure()        # Sync - blocks event loop!

# Beta.2: Full async (non-blocking)
async def beta2_pattern():
    await simpleenvs.aload_dotenv()               # Async
    await simpleenvs.load_dotenv_secure_async()   # Async - non-blocking!
```

### Concurrent Loading Benefits

```python
# Beta.2: Can load multiple configs concurrently
async def concurrent_loading():
    """Load multiple environment files concurrently"""
    
    # Load public and secret configs in parallel
    await asyncio.gather(
        simpleenvs.aload_dotenv('.env.public'),
        simpleenvs.load_dotenv_secure_async('.env.secrets')
    )
    
    print("✅ All configs loaded concurrently!")

# Run concurrent loading
await concurrent_loading()
```

---

## ✅ Migration Checklist

### Pre-Migration
- [ ] **Backup current configuration** - Save existing .env files
- [ ] **Document current patterns** - Note your usage patterns
- [ ] **Review dependencies** - Check if other libraries are affected
- [ ] **Plan testing strategy** - Decide how to validate the migration

### During Migration
- [ ] **Install beta.2** - `pip install simpleenvs-python==2.0.0-beta.2`
- [ ] **Run existing tests** - Verify backward compatibility
- [ ] **Update async patterns** - Adopt new async secure functions
- [ ] **Test new features** - Validate new functionality works

### Post-Migration  
- [ ] **Performance testing** - Measure improvement gains
- [ ] **Monitor in production** - Watch for any issues
- [ ] **Update documentation** - Document new patterns used
- [ ] **Team training** - Share new async patterns with team

---

## 🎯 Best Practices for Beta.2

### 1. Consistent Async Patterns

```python
# ✅ Recommended: Full async consistency
async def modern_startup():
    await simpleenvs.aload_dotenv()
    await simpleenvs.load_dotenv_secure_async()

# ❌ Avoid: Mixed patterns
async def mixed_startup():
    await simpleenvs.aload_dotenv()
    simpleenvs.load_dotenv_secure()  # Sync in async context
```

### 2. Environment-Specific Strategies

```python
# ✅ Recommended: Environment-aware async loading
async def load_for_environment():
    env = os.getenv('ENVIRONMENT', 'development')
    
    if env == 'production':
        await simpleenvs.load_dotenv_secure_async(strict=True)
    else:
        await simpleenvs.aload_dotenv()
```

### 3. Error Handling

```python
# ✅ Recommended: Comprehensive error handling
async def safe_environment_loading():
    try:
        await simpleenvs.load_dotenv_secure_async()
    except simpleenvs.FileNotFoundError:
        print("⚠️ No .env file found - using defaults")
    except simpleenvs.SimpleEnvsError as e:
        print(f"❌ Configuration error: {e}")
        raise
```

---

## 🔗 Related Resources

### Documentation
- 📖 [Quick Start Guide](quickstart.md) - Updated for beta.2
- 📚 [API Reference](api-reference.md) - Complete beta.2 API
- 🔒 [Security Guide](security.md) - Security best practices

### Community
- 💬 [GitHub Discussions](https://github.com/vmintf/SimpleEnvs-Python/discussions) - Ask questions
- 🐛 [Issue Tracker](https://github.com/vmintf/SimpleEnvs-Python/issues) - Report problems
- 📧 [Contact Support](mailto:vmintf@gmail.com) - Direct support

### Examples
- 🏗️ [Example Applications](../examples/) - Real-world usage
- ⚡ [Performance Benchmarks](../benchmark.py) - Test improvements
- 🧪 [Test Suite](../tests/) - Validation examples

---

## 🎉 Migration Complete!

**Congratulations!** You've successfully migrated to SimpleEnvs v2.0.0-beta.2! 

### What You've Gained:
- ⚡ **Enhanced Performance** - Fully async patterns
- 🔄 **Better Consistency** - Unified async approach  
- 🆕 **New Features** - Async secure loading
- 🛡️ **Same Security** - No compromises on protection

### Next Steps:
- 🚀 **Explore advanced patterns** in the [Quick Start Guide](quickstart.md)
- 📖 **Review complete API** in the [API Reference](api-reference.md)
- 🔒 **Enhance security** with the [Security Guide](security.md)

**Need help?** We're here to support your migration journey! 💪

---

*Migration Guide for SimpleEnvs v2.0.0-beta.2 - Async-first environment loading* ⚡🚀